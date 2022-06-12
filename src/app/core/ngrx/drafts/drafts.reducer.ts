import { createReducer, on, Action } from '@ngrx/store';
import * as DraftActions from './drafts.actions';
import { Post } from '@shared/types/interface.types';

export interface DraftsState {
  drafts: Post[];
  loaded: boolean;
  active: Post;
  activeLoaded: boolean;
  full: boolean;
  error: string | null;
}

export const inititalState: DraftsState = {
  drafts: [],
  loaded: false,
  active: null,
  activeLoaded: false,
  full: false,
  error: null,
};

const featureReducer = createReducer(
  inititalState,
  // GET DRAFTS
  on(DraftActions.getByUserSuccess, (state, { drafts }) => (
    {
      ...state,
      loaded: true,
      drafts,
      error: null,
      full: completed(drafts)
    }
  )),
  on(DraftActions.getByUserFailure, (state, { error }) => ({ ...state, error })),
  // CREATE DRAFT
  on(DraftActions.createSuccess, (state, { draft }) => (
    {
      ...state,
      drafts: [draft, ...state.drafts],
      active: draft
    }
  )),
  on(DraftActions.createFailure, (state, { error }) => ({ ...state, error })),
  // DELETE DRAFT
  on(DraftActions.deleteSuccess, (state, { id }) => (
    {
      ...state,
      drafts: [...state.drafts].filter(d => d._id !== id),
      active: null
    }
  )),
  // SET ACTIVE
  on(DraftActions.setActive, (state, { draft }) => ({ ...state, active: draft})),
  on(DraftActions.activeOff, (state) => ({ ...state, active: null})),
  // RESET
  on(DraftActions.reset, (state) => (
    {
      ...state,
      loaded: false,
      error: null,
      drafts: [],
      full: false
    }
  ))
);

export function reducer(state: DraftsState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getDrafts = (state: DraftsState) => state.drafts;
export const getDraftsLoaded = (state: DraftsState) => state.loaded;
export const getFull = (state: DraftsState) => state.full;
export const getActive = (state: DraftsState) => state.active;


function completed(posts: Post[]): boolean {
  return posts.length === 0;
}