import { props, createAction } from '@ngrx/store';
import { Post } from '@shared/types/interface.types';

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


// RESET POSTS
export const reset =
  createAction('[Posts API] Reset Posts');

export const resetSlug =
  createAction('[Posts API] Reset Post Slug');

export const resetByUser =
  createAction('[Posts API] Reset Posts By User');