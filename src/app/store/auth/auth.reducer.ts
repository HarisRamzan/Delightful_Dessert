import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/models';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  
  // Login
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Register
  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Logout
  on(AuthActions.logout, state => ({
    ...initialState
  })),
  on(AuthActions.logoutSuccess, state => initialState)
);
