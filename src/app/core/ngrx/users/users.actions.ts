import { props, createAction } from '@ngrx/store';
import { User } from '@shared/types/interface.types';

// LOGIN USER
export const login =
  createAction('[Users API] Login User',
  props<{ name: string, password: string }>());

export const loginSuccess =
  createAction('[Users API] Login User Success',
  props<{ user: User }>());

export const loginFailure =
  createAction('[Users API] Login User Failure',
  props<{ error: string }>());

// REGISTER USER
export const register =
  createAction('[Users API] Register User',
  props<{ user: User }>());

// USER LOGOUT
export const userLogOut = createAction('[Users API] User Log Out');
// VERIFY TOKEN
export const verifyToken = createAction('[Users API] Verify Token');

// REFRESH TOKEN
export const refreshToken =
  createAction('[Users API] Refresh Token',
  props<{ id: string }>());

// UPDATE
export const update =
  createAction('[Users API] Update User',
  props<{ user: User }>());

export const updateFailure =
  createAction('[Users API] Update User Failure',
  props<{ error: string }>());
