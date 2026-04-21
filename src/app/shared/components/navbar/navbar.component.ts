import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItemCount } from '../../../store/cart/cart.selectors';
import { selectUser, selectIsAdmin } from '../../../store/auth/auth.selectors';
import { User } from '../../../core/models';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAdmin$: Observable<boolean>;
  cartItemCount$: Observable<number>;
  isMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.currentUser$ = this.store.select(selectUser);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToShop(): void {
    this.router.navigate(['/shop']);
  }
}
