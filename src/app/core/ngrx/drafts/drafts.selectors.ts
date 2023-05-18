import { createSelector } from '@ngrx/store';

import * as fromDrafts from './drafts.reducer';
import { DraftsPartialState, getDraftsPartialState } from '../ngrx.index';

export const getDraftsState = createSelector(
  getDraftsPartialState,
  (state: DraftsPartialState) => state.drafts
);

export const get = createSelector(getDraftsState, fromDrafts.getDrafts);
export const getLoaded = createSelector(getDraftsState, fromDrafts.getDraftsLoaded);
export const getAll = createSelector(getDraftsState, fromDrafts.getAll);
export const getAllLoaded = createSelector(getDraftsState, fromDrafts.getAllLoaded);
export const getActive = createSelector(getDraftsState, fromDrafts.getActive);
export const getSaving = createSelector(getDraftsState, fromDrafts.getSaving);
export const getPreview = createSelector(getDraftsState, fromDrafts.getPreview);
export const getBySlug = createSelector(getDraftsState, fromDrafts.getBySlug);
export const getBySlugLoaded = createSelector(getDraftsState, fromDrafts.getBySlugLoaded);
export const getById = (id: string) => createSelector(getAll, (drafts) => drafts.find(d => d._id === id));