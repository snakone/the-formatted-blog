import { createSelector } from '@ngrx/store';

import * as fromSearch from './search.reducer';
import { AppState, getAppState } from '../ngrx.index';

export const getSearchState = createSelector(
  getAppState,
  (state: AppState) => state.search
);

export const getresult = createSelector(getSearchState, fromSearch.getResult);
export const getSearchValue = createSelector(getSearchState, fromSearch.getValue);
export const getLoaded = createSelector(getSearchState, fromSearch.getLoaded);