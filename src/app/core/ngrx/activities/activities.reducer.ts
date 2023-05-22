import { createReducer, on, Action } from '@ngrx/store';
import * as ActivitiesActions from './activities.actions';
import { UserActivity } from '@shared/types/interface.types';

export interface ActivitiesState {
  activities: UserActivity[] | null;
  error: string | null;
  loaded: boolean;
}

export const inititalState: ActivitiesState = {
  activities: [],
  error: null,
  loaded: false
};

const featureReducer = createReducer(
  inititalState,
  // GET
  on(ActivitiesActions.getSuccess, (state, {activities}) => ({ ...state, loaded: true, activities })),
  on(ActivitiesActions.getFailure, (state, {error}) => ({ ...state, error, loaded: false })),
  // RESET
  on(ActivitiesActions.reset, (state) => ({ ...state, activities: [], loaded: false })),
);

export function reducer(state: ActivitiesState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getActivities = (state: ActivitiesState) => state.activities;
export const getLoaded = (state: ActivitiesState) => state.loaded;
