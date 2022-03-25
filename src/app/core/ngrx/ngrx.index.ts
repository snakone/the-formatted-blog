import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

// STATE
import * as fromUsers from '@store/users/users.reducer';
import * as fromPosts from '@store/posts/posts.reducer';

export interface AppState {
  users: fromUsers.UserState;
  posts: fromPosts.PostState
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUsers.reducer,
  posts: fromPosts.reducer
};

export const getAppState = createFeatureSelector<AppState>('AppState');
