import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as PostsActions from './posts.actions';
import * as DraftActions from '../drafts/drafts.actions';
import * as fromPosts from './posts.selectors';
import { map, concatMap, catchError, debounceTime, withLatestFrom, switchMap, tap } from 'rxjs/operators';
import { PostService } from '@core/services/api/post.service';
import { PostState } from './posts.reducer';
import { Store } from '@ngrx/store';
import { FavoriteService } from '@core/services/api/favorite.service';
import { CrafterService } from '@core/services/crafter/crafter.service';

@Injectable()

export class PostEffects {

  constructor(
    private actions: Actions,
    private postSrv: PostService,
    private store: Store<PostState>,
    private favService: FavoriteService,
    private crafter: CrafterService
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

  // UNPUBLISH POST
  unPublishPostEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(PostsActions.unPublish),
      concatMap((action) =>
      this.postSrv.unPublishPost(action.post)
        .pipe(
          map(post => PostsActions.unPublishSuccess({ post })),
          catchError(error =>
              of(PostsActions.unPublishFailure({ error: error.message }))
    ))))
  );

  onUnPublishPostEffect$ = createEffect(() => 
    this.actions
    .pipe(
      ofType(PostsActions.unPublishSuccess),
      tap(_ => this.crafter.setSnack('Boceto archivado!', 'success')),
      switchMap((_) => of(...[
        DraftActions.reset(),
        PostsActions.reset(),
        DraftActions.setActive({draft: _.post})
      ]))
    )
  );

}