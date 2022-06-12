import { createSelector } from '@ngrx/store';

import * as fromDrafts from './drafts.reducer';
import { DraftsPartialState, getDraftsPartialState } from '../ngrx.index';

export const getDraftsState = createSelector(
  getDraftsPartialState,
  (state: DraftsPartialState) => state.drafts
);

export const get = createSelector(getDraftsState, fromDrafts.getDrafts);
export const getLoaded = createSelector(getDraftsState, fromDrafts.getDraftsLoaded);
export const getActive = createSelector(getDraftsState, fromDrafts.getActive);
export const getSaving = createSelector(getDraftsState, fromDrafts.getSaving);