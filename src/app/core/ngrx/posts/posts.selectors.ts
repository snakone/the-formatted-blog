import { createSelector } from '@ngrx/store';

import * as fromPosts from './posts.reducer';
import { AppState, getAppState } from '../ngrx.index';
import { getDraftsState } from '../drafts/drafts.selectors';

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
export const getFiltered = createSelector(getPostsState, getDraftsState, fromPosts.getFiltered);
export const getFavoritesID = createSelector(getPostsState, fromPosts.getFavoritesID);
export const getFavorites = createSelector(getPostsState, getDraftsState, fromPosts.getFavorites);
export const getById = (id: string) => createSelector(get, (posts) => posts.find(p => p._id === id));