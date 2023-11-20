import { props, createAction } from '@ngrx/store';
import { FilterType } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';

// GET POSTS
export const get =
  createAction('[Posts API] Get Posts');

export const getSuccess =
  createAction('[Posts API] Get Posts Success',
  props<{ posts: Post[] }>());

export const getFailure =
  createAction('[Posts API] Get Posts Failure',
  props<{ error: string }>());

// GET ARTICLE BY SLUG
export const getBySlug =
  createAction('[Posts API] Get Post by Slug',
  props<{ slug: string }>());

export const getBySlugSuccess =
  createAction('[Posts API] Get Posts by Slug Success',
  props<{ post: Post }>());

export const getBySlugFailure =
  createAction('[Posts API] Get Post by Slug Failure',
  props<{ error: string }>());

// GET POSTS BY USER
export const getByUser =
  createAction('[Posts API] Get Posts by User',
  props<{ id: string }>());

export const getByUserSuccess =
  createAction('[Posts API] Get Posts by User Success',
  props<{ posts: Post[] }>());


// RESET POSTS
export const reset =
  createAction('[Posts API] Reset Posts');

export const resetSlug =
  createAction('[Posts API] Reset Post Slug');

export const resetByUser =
  createAction('[Posts API] Reset Posts By User');

// SET FILTER
export const setFilter =
  createAction('[Posts API] Set Filter',
  props<{ value: FilterType }>());

export const resetFilter =
  createAction('[Posts API] Reset Filter');

// ADD FAVORITE
export const addFavorite =
  createAction('[Posts API] Add Favorite',
  props<{ id: string }>());

// RESET FAVORITE
export const resetFavorite =
  createAction('[Posts API] Reset Favorite');

// REMOVE FAVORITE
export const removeFavorite =
  createAction('[Posts API] Remove Favorite',
  props<{ id: string }>());

// SET FAVORITE
export const setFavorite =
  createAction('[Posts API] Set Favorite',
  props<{ favorites: string[] }>());

// GET FAVORITE FAILURE
export const getFavoritesFailure =
  createAction('[Posts API] Get Favorites Failure',
  props<{ error: string }>());

// UNPUBLISH POST
export const unPublish =
  createAction('[Posts API] Unpublish Post',
  props<{ post: Post }>());

export const unPublishSuccess =
  createAction('[Posts API] Unpublish Post Success',
  props<{ post: Post }>());

export const unPublishFailure =
  createAction('[Posts API] Unpublish Post Failure',
  props<{ error: string }>());