import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as PostsActions from './posts.actions';
import * as fromPosts from './posts.selectors';
import { map, concatMap, catchError, debounceTime, withLatestFrom } from 'rxjs/operators';
import { PostService } from '@core/services/api/post.service';
import { PostState } from './posts.reducer';
import { Store } from '@ngrx/store';
import { FavoriteService } from '@core/services/api/favorite.service';

@Injectable()

export class PostEffects {

  constructor(
    private actions: Actions,
    private postSrv: PostService,
    private store: Store<PostState>,
    private favService: FavoriteService
  ) { }

  // GET POSTS
  loadPostsEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(PostsActions.get),
      concatMap(() =>
      this.postSrv.get()
        .pipe(
          map(posts => PostsActions.getSuccess({ posts })),
          catchError(error =>
              of(PostsActions.getFailure({ error: error.message }))
    ))))
  );

  // GET POST BY SLUG
  loadPostBySlugEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(PostsActions.getBySlug),
      concatMap((action) =>
      this.postSrv.getBySlug(action.slug)
        .pipe(
          map(post => PostsActions.getBySlugSuccess({ post })),
          catchError(error =>
              of(PostsActions.getBySlugFailure({ error: error.message }))
    ))))
  );

  // GET POSTS BY USER
  getPostsByUserEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(PostsActions.getByUser),
      concatMap((action) =>
      this.postSrv.getByUser(action.id)
        .pipe(
          map(posts => PostsActions.getSuccess({ posts })),
          catchError(error =>
              of(PostsActions.getFailure({ error: error.message }))
    ))))
  );

  // SAVE FAVORITES
  saveFavoritesEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(...[
        PostsActions.addFavorite,
        PostsActions.removeFavorite,
      ]),
      debounceTime(1000),
      withLatestFrom(this.store.select(fromPosts.getFavoritesID)),
      concatMap(([_, ids]) =>
      this.favService.addFavorites(ids)
        .pipe(
          catchError(error =>
              of(PostsActions.getFailure({ error: error.message }))
    )))), {dispatch: false}
  );

}