import { createSelector } from '@ngrx/store';

import * as fromNews from './news.reducer';
import { NewsPartialState, getNewsPartialState } from '../ngrx.index';

export const getNewsState = createSelector(
  getNewsPartialState,
  (state: NewsPartialState) => state.news
);

export const get = createSelector(getNewsState, fromNews.getNews);
export const getLoaded = createSelector(getNewsState, fromNews.getLoaded);