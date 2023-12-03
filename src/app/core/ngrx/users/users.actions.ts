import { props, createAction } from '@ngrx/store';
import { FilterType } from '@shared/types/interface.app';
import { User } from '@shared/types/interface.user';

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

  export const updateSuccess =
  createAction('[Users API] Update User Success',
  props<{ user: User }>());

export const updateFailure =
  createAction('[Users API] Update User Failure',
  props<{ error: string }>());

// ADD FRIENDS
export const addFriend =
  createAction('[Users API] Add Friends',
  props<{ friend: User }>());

// RESET FRIENDS
export const resetFriends =
  createAction('[Users API] Reset Friends');

// REMOVE FRIENDS
export const removeFriend =
  createAction('[Users API] Remove Friends',
  props<{ id: string }>());

// SET FRIENDS
export const setFriends =
  createAction('[Users API] Set Friends',
  props<{ friends: User[] }>());

// GET FRIENDS FAILURE
export const getFriendsFailure =
  createAction('[Users API] Get Friends Failure',
  props<{ error: string }>());

// SET PUBLIC
export const setPublic =
  createAction('[Users API] Set Public',
  props<{ user: User }>());

// RESET PUBLIC PROFILE
export const resetPublic = createAction('[Users API] Reset Public');

// SET FILTER
export const setFilter =
  createAction('[Users API] Set Filter',
  props<{ value: FilterType }>());

export const resetFilter =
  createAction('[Users API] Reset Filter');
