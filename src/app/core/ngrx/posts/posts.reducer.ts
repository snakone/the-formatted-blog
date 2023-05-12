import { createReducer, on, Action } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { FilterType, Post } from '@shared/types/interface.types';
import { DUMMY_POST } from '@shared/data/data';
import { DraftsState } from '../drafts/drafts.reducer';

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
  favorites: string[];
}

export const inititalState: PostState = {
  posts: [...DUMMY_POST],
  postsLoaded: false,
  user: [],
  userLoaded: false,
  slug: null,
  slugLoaded: false,
  full: false,
  error: null,
  filter: {title: '', type: null},
  favorites: []
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
  on(PostActions.getFailure, (state, { error }) => ({...state, postsLoaded: false, error})),
  // POST BY SLUG
  on(PostActions.getBySlug, (state) => ({...state, slugLoaded: false, error: null, slug: null})),
  // POSTS BY USER
  on(PostActions.getByUser, (state) => ({...state, userLoaded: false, error: null})),
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
    {...state, userLoaded: false, error: null, user: null}
  )),
  on(PostActions.setFilter, (state, { value }) => (
    {...state, filter: { ...state.filter, ...value }}
  )),
  on(PostActions.resetFilter, (state) => (
    {...state, filter: { ...inititalState.filter }}
  )),
  // FAVORITES
  on(PostActions.addFavorite, (state, { id }) => (
    {...state, favorites: Array.from(new Set([...state.favorites, id]))}
  )),
  on(PostActions.removeFavorite, (state, { id }) => (
    {...state, favorites: [...state.favorites].filter(fav => fav !== id)}
  )),
  on(PostActions.setFavorite, (state, { favorites }) => (
    {...state, favorites }
  )),
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
export const getFavoritesID = (state: PostState) => state.favorites;

function completed(posts: Post[]): boolean {
  return posts.length === 0;
}

export const getFavorites = (statePost: PostState, stateDraft: DraftsState) => ({ 
  data: [...stateDraft.drafts, ...statePost.posts]
}).data.filter(post => statePost.favorites.includes(post?._id));

export const getFiltered = (statePost: PostState, stateDraft: DraftsState) => filterAll(statePost, stateDraft);

const switchObj = {
  draft: (statePost: PostState, stateDraft: DraftsState) => stateDraft.drafts,
  post: (statePost: PostState, stateDraft: DraftsState) => statePost.posts,
  favorite: (statePost: PostState, stateDraft: DraftsState) => getFavorites(statePost, stateDraft),
  any: (statePost: PostState, stateDraft: DraftsState) => [...statePost.posts, ...stateDraft.drafts],
};

const filterAll = (statePost: PostState, stateDraft: DraftsState) => {
  console.log(statePost.filter)
  return switchObj[statePost.filter.type || 'any'](statePost, stateDraft)
    .filter((post) => 
      Object.entries(statePost.filter)
      .filter(([key, _]) => key !== 'type')
      .some(
      ([
        key,
        value
    ]) => post[key]?.toLowerCase().includes(String(value)?.toLowerCase())
  ))
}