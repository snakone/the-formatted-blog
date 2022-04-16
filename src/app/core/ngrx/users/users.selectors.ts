import { createSelector } from '@ngrx/store';
import { AppState, getAppState } from '../ngrx.index';
import * as fromUsers from './users.reducer';

export const getUserState = createSelector(
  getAppState,
  (state: AppState) => state.users
);

export const get = createSelector(getUserState, fromUsers.getUser);
