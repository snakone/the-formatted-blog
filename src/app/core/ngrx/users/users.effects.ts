import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, concatMap, catchError, tap, switchMap } from 'rxjs/operators';

import { LoginService } from '@services/api/login.service';
import { UserService } from '@services/api/users.service';
import { StorageService } from '@services/storage/storage.service';
import { PWAService } from '@core/services/pwa/pwa.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { FavoriteService } from '@core/services/api/favorite.service';

import * as UserActions from './users.actions';
import * as DraftActions from '../drafts/drafts.actions';
import * as PostsActions from '../posts/posts.actions';
import * as ActivitiesActions from '../activities/activities.actions';

import { LOGIN_SENTENCE, LOGOUT_SENTENCE, REGISTER_SENTENCE, UPDATED_SENTENCE } from '@shared/data/sentences';

@Injectable()

export class UserEffects {

  constructor(
    private actions: Actions,
    private loginSrv: LoginService,
    private userSrv: UserService,
    private ls: StorageService,
    private router: Router,
    private crafter: CrafterService,
    private sw: PWAService,
    private favService: FavoriteService
  ) { }

  // LOGIN USER
  loginUserEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.login),
      concatMap((action) =>
      this.loginSrv.signIn(action.name, action.password)
        .pipe(
          tap(_ => this.navigate(null, LOGIN_SENTENCE)),
          map(user => UserActions.loginSuccess({ user })),
          catchError(error =>
              of(UserActions.loginFailure({ error: error.message }))
    ))))
  );

  // REGISTER USER
  registerUserEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.register),
      concatMap((action) =>
      this.loginSrv.signUp(action.user)
        .pipe(
          tap(_ => this.navigate('/profile', REGISTER_SENTENCE)),
          map(user => UserActions.loginSuccess({ user })),
          catchError(error =>
              of(UserActions.loginFailure({ error: error.message }))
    ))))
  );

  // VERIFY TOKEN
  verifyTokenEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.verifyToken),
      concatMap(() =>
      this.userSrv.verifyToken()
        .pipe(
          map(user => UserActions.loginSuccess({ user })),
          catchError(error =>
              of(UserActions.loginFailure({ error: error.message }))
    ))))
  );

  // REFRESH TOKEN
  refreshTokenEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.refreshToken),
      concatMap((action) =>
      this.userSrv.refreshToken(action.id)
        .pipe(
          map(user => UserActions.loginSuccess({ user })),
          catchError(error =>
              of(UserActions.loginFailure({ error: error.message }))
    ))))
  );

  // UPDATE
  updateUserEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.update),
      concatMap((action) =>
      this.userSrv.update(action.user)
        .pipe(
          tap(_ => this.navigate(null, UPDATED_SENTENCE)),
          map(user => UserActions.loginSuccess({ user })),
          catchError(error =>
              of(UserActions.updateFailure({ error: error.message }))
    ))))
  );

  // USER LOGOUT
  logOutEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.userLogOut),
      tap(_ => this.resetUser()),
      switchMap(_ => [
        DraftActions.reset(null),
        DraftActions.resetActive(),
        PostsActions.resetByUser(),
        PostsActions.resetFavorite()
      ])
    )
  );

  // USER UPDATE ACTIVITIES
  userUpdateActivitiesEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.loginSuccess),
      concatMap(_ => of(ActivitiesActions.get()))
    )
  );

  // GET FAVORITES ON LOGIN
  getFavoritesOnLogin$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.loginSuccess),
      concatMap(_ => 
        this.favService.getFavoritesByUser()
         .pipe(
            map((favorites: string[]) => PostsActions.setFavorite({favorites})),
            catchError(error =>
              of(PostsActions.getFavoritesFailure({ error: error.message }))
    ))))
  );

  private async navigate(
    path: string | null, 
    sentence: string
  ): Promise<void> {
    if (path) this.router.navigateByUrl(path);
    this.crafter.setSnack(sentence, 'info');
  }

  private resetUser(): void {
    this.ls.setKey('token', null);
    this.userSrv.setUser(null);
    this.navigate('/', LOGOUT_SENTENCE)
  }

}