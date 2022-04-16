import { createReducer, on, Action } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { Post } from '@shared/types/interface.types';

export interface PostState {
  posts: Post[];
  postsLoaded: boolean;
  user: Post[] | null;
  userLoaded: boolean;
  slug: Post | null;
  slugLoaded: boolean;
  full: boolean;
  error: string | null;
}

export const inititalState: PostState = {
  posts: [],
  postsLoaded: false,
  user: [],
  userLoaded: false,
  slug: null,
  slugLoaded: false,
  full: false,
  error: null,
};

const featureReducer = createReducer(
  inititalState,
  // GET POSTS
  on(PostActions.get, state => ({ ...state, error: null })),
  on(PostActions.getSuccess, (state, { posts }) => (
    {
      ...state,
      postsLoaded: true,
      posts: [...state.posts, ...posts],
      error: null,
      full: completed(posts)
    }
  )),
  on(PostActions.getFailure, (state, { error }) => ({ ...state, postsLoaded: false, error })),
  // POST BY SLUG
  on(PostActions.getBySlug, (state) => ({ ...state, slugLoaded: false, error: null, slug: null })),
  // POSTS BY USER
  on(PostActions.getByUser, (state) => ({ ...state, userLoaded: false, error: null })),
  // RESET
  on(PostActions.reset, (state) => (
    {
      ...state,
      postsLoaded: false,
      error: null,
      posts: [],
      full: false
    }
  )),
  on(PostActions.resetSlug, (state) => (
    {
      ...state,
      slugLoaded: false,
      error: null,
      slug: null
    }
  )),
  on(PostActions.resetByUser, (state) => (
    { ...state, userLoaded: false, error: null, user: null }
  ))
);

export function reducer(state: PostState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getPosts = (state: PostState) => state.posts;
export const getPostsLoaded = (state: PostState) => state.postsLoaded;
export const getByUser = (state: PostState) => state.user;
export const getByUserLoaded = (state: PostState) => state.userLoaded;
export const getFull = (state: PostState) => state.full;
export const getSlug = (state: PostState) => state.slug;


function completed(posts: Post[]): boolean {
  return posts.length === 0;
}