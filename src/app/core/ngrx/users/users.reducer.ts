import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './users.actions';
import { User } from '@shared/types/interface.types';

export interface UserState {
  user: User | null;
  email: string | null;
  error: string | null;
  loaded: boolean;
  friends: User[];
  public: User;
}

export const inititalState: UserState = {
  user: null,
  email: null,
  error: null,
  loaded: false,
  friends: [],
  public: null
};

const featureReducer = createReducer(
  inititalState,
  // LOGIN USER
  on(UserActions.loginSuccess, (state, { user }) => ({...state, error: null, user, loaded: true })),
  on(UserActions.loginFailure, (state, { error }) => ({ ...state, loaded: false, error })),
  // USER LOG OUT
  on(UserActions.userLogOut, (state) => ({ ...state, error: null, user: null, loaded: false })),
  // FRIENDS
  on(UserActions.addFriend, (state, { friend }) => (
    {...state, friends: Array.from(new Set([...state.friends, friend]))}
  )),
  on(UserActions.removeFriend, (state, { id }) => (
    {...state, friends: [...state.friends].filter(frd => frd._id !== id)}
  )),
  on(UserActions.setFriends, (state, { friends }) => (
    {...state, friends }
  )),
  on(UserActions.resetFriends, (state) => (
    {...state, friends: [] }
  )),
  // PUBLIC
  on(UserActions.setPublic, (state, { user }) => (
    {...state, public: user }
  )),
);

export function reducer(state: UserState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getUser = (state: UserState) => state.user;
export const getFriends = (state: UserState) => state.friends;
export const getPublic = (state: UserState) => state.public;
