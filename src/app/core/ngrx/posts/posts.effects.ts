import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as PostsActions from './posts.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { PostService } from '@core/services/api/post.service';
import { PostsFacade } from './posts.facade';

@Injectable()

export class PostEffects {

  constructor(
    private actions: Actions,
    private postSrv: PostService,
    private postFacade: PostsFacade
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

}