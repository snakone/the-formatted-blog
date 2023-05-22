import { createSelector } from '@ngrx/store';

import * as fromActivities from './activities.reducer';
import { ActivitiesPartialState, getActivitiesPartialState } from '../ngrx.index';

export const getActivitiesState = createSelector(
  getActivitiesPartialState,
  (state: ActivitiesPartialState) => state.activities
);

export const get = createSelector(getActivitiesState, fromActivities.getActivities);
export const getLoaded = createSelector(getActivitiesState, fromActivities.getLoaded);