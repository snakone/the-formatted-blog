import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, concatMap, catchError, tap, switchMap } from 'rxjs/operators';

import * as UserActions from './users.actions';
import * as DraftActions from '../drafts/drafts.actions';
import * as PostsActions from '../posts/posts.actions';
import { LoginService } from '@services/api/login.service';
import { UserService } from '@services/api/users.service';
import { StorageService } from '@services/storage/storage.service';
import { LOGIN_SENTENCE, LOGOUT_SENTENCE, REGISTER_SENTENCE, UPDATED_SENTENCE } from '@shared/data/sentences';
import { PWAService } from '@core/services/pwa/pwa.service';
import { WELCOME_PUSH } from '@shared/data/notifications';
import { firstValueFrom } from 'rxjs';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { FavoriteService } from '@core/services/api/favorite.service';

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
          tap(_ => this.navigate('/profile', REGISTER_SENTENCE, true)),
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
        DraftActions.resetActive()
      ])
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
    sentence: string,
    sw: boolean = false
  ): Promise<void> {
    if (path) this.router.navigateByUrl(path);
    this.crafter.setSnack(sentence, 'info');
    if (sw) await firstValueFrom(this.sw.send(WELCOME_PUSH));
  }

  private resetUser(): void {
    this.ls.setKey('token', null);
    this.userSrv.setUser(null);
    this.navigate('/', LOGOUT_SENTENCE)
  }

}