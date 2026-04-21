import { createAction, props } from '@ngrx/store';
import { User, LoginRequest, RegisterRequest } from '../../core/models';

// Login actions
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

// Register actions
export const register = createAction(
  '[Auth] Register',
  props<{ userData: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; token: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

// Google OAuth
export const googleAuth = createAction(
  '[Auth] Google Auth',
  props<{ token: string }>()
);

// Logout
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');
