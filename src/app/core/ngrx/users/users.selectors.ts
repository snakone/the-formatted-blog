import { createSelector } from '@ngrx/store';
import { AppState, getAppState } from '../ngrx.index';
import * as fromUsers from './users.reducer';

export const getUserState = createSelector(
  getAppState,
  (state: AppState) => state.user
);

export const get = createSelector(getUserState, fromUsers.getUser);
export const getFriends = createSelector(getUserState, fromUsers.getFriends);
export const getPublic = createSelector(getUserState, fromUsers.getPublic);
