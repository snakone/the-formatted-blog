import { createSelector } from '@ngrx/store';

import * as fromPosts from './posts.reducer';
import { AppState, getAppState } from '../ngrx.index';

export const getPostsState = createSelector(
  getAppState,
  (state: AppState) => state.posts
);

export const get = createSelector(getPostsState, fromPosts.getPosts);
export const getLoaded = createSelector(getPostsState, fromPosts.getPostsLoaded);
export const getBySlug = createSelector(getPostsState, fromPosts.getSlug);
export const getByUser = createSelector(getPostsState, fromPosts.getByUser);
export const getByUserLoaded = createSelector(getPostsState, fromPosts.getByUserLoaded);
export const getFull = createSelector(getPostsState, fromPosts.getFull);