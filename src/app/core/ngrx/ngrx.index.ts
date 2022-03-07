import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromUsers from './users/users.reducer';

export interface AppState {
  users: fromUsers.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUsers.reducer
};

export const getAppState = createFeatureSelector<AppState>('AppState');
