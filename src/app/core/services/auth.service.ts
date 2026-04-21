import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment.development';
import { User, LoginRequest, RegisterRequest, AuthResponse, GoogleAuthResponse } from '../models';
import * as AuthActions from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.setSession(response))
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => this.setSession(response))
      );
  }

  googleAuth(token: string): Observable<AuthResponse> {
    return this.http.post<GoogleAuthResponse>(`${environment.apiUrl}/auth/google-login`, { GoogleToken: token })
      .pipe(
        map(response => {
          // Extract token from response
          const jwtToken = response.data.token;
          
          // Decode JWT to get user information
          const user = this.decodeToken(jwtToken);
          
          // Transform to AuthResponse format
          const authResponse: AuthResponse = {
            token: jwtToken,
            user: user
          };
          
          return authResponse;
        }),
        tap(response => this.setSession(response))
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'Admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResult.token);
    localStorage.setItem(this.userKey, JSON.stringify(authResult.user));
    this.currentUserSubject.next(authResult.user);
    // Sync with store
    this.store.dispatch(AuthActions.initializeAuth({ 
      user: authResult.user, 
      token: authResult.token 
    }));
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem(this.userKey);
    const token = localStorage.getItem(this.tokenKey);
    
    if (userJson && token) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        // Sync with store
        this.store.dispatch(AuthActions.initializeAuth({ user, token }));
      } catch (error) {
        console.error('Error parsing user from storage', error);
      }
    }
  }

  private decodeToken(token: string): User {
    try {
      // Decode JWT payload (second part of the token)
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      // Extract claims using standard claim keys
      const nameIdentifier = decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || '';
      const fullName = decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
      const email = decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '';
      const role = decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User';
      
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      return {
        id: nameIdentifier,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error('Invalid token');
    }
  }
}
