import { createReducer, on, Action } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { FilterType, Post } from '@shared/types/interface.types';
import { DUMMY_POST } from '@shared/data/data';

export interface PostState {
  posts: Post[];
  postsLoaded: boolean;
  user: Post[] | null;
  userLoaded: boolean;
  slug: Post | null;
  slugLoaded: boolean;
  full: boolean;
  error: string | null;
  filter: FilterType;
}

export const inititalState: PostState = {
  posts: [...DUMMY_POST, ...DUMMY_POST],
  postsLoaded: false,
  user: [],
  userLoaded: false,
  slug: null,
  slugLoaded: false,
  full: false,
  error: null,
  filter: {title: ''}
};

const featureReducer = createReducer(
  inititalState,
  // GET POSTS
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
  )),
  on(PostActions.setFilter, (state, { value }) => (
    { ...state, filter: { ...state.filter, ...value }}
  )),
  on(PostActions.resetFilter, (state) => (
    { ...state, filter: { ...inititalState.filter }}
  ))
);

export function reducer(state: PostState | undefined, action: Action) {
  return featureReducer(state, action);
}

const filtered = (state: PostState) =>
 state.posts.filter((post) => 
  Object.entries(state.filter).some(
    ([
      key,
      value
    ]) => {
      return post[key].toLowerCase().includes(String(value).toLowerCase())
    }
  )
);

export const getPosts = (state: PostState) => state.posts;
export const getPostsLoaded = (state: PostState) => state.postsLoaded;
export const getByUser = (state: PostState) => state.user;
export const getByUserLoaded = (state: PostState) => state.userLoaded;
export const getFull = (state: PostState) => state.full;
export const getSlug = (state: PostState) => state.slug;
export const getFiltered = (state: PostState) => filtered(state);


function completed(posts: Post[]): boolean {
  return posts.length === 0;
}