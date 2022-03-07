import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './users.actions';
import { User } from '@shared/types/interface.types';

export interface UserState {
  user: User | null;
  email: string | null;
  error: string | null;
  loaded: boolean;
}

export const inititalState: UserState = {
  user: null,
  email: null,
  error: null,
  loaded: false
};

const featureReducer = createReducer(
  inititalState,
  // LOGIN USER
  on(UserActions.loginSuccess, (state, { user }) => ({...state, error: null, user, loaded: true })),
  on(UserActions.loginFailure, (state, { error }) => ({ ...state, loaded: false, error })),
  // USER LOG OUT
  on(UserActions.userLogOut, (state) => ({ ...state, error: null, user: null, loaded: false })),
);

export function reducer(state: UserState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getUser = (state: UserState) => state.user;
