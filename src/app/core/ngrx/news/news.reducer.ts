import { createReducer, on, Action } from '@ngrx/store';
import * as NewsActions from './news.actions';
import { FormattedNew } from '@shared/types/interface.types';

export interface NewsState {
  news: FormattedNew[] | null;
  error: string | null;
  loaded: boolean;
}

export const inititalState: NewsState = {
  news: null,
  error: null,
  loaded: false
};

const featureReducer = createReducer(
  inititalState,
  // GET
  on(NewsActions.getSuccess, (state, {news}) => ({ ...state, loaded: true, news })),
  on(NewsActions.getFailure, (state, {error}) => ({ ...state, error, loaded: false })),
);

export function reducer(state: NewsState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getNews = (state: NewsState) => state.news;
export const getLoaded = (state: NewsState) => state.loaded;