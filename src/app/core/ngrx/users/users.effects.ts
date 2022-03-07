import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, concatMap, catchError, tap } from 'rxjs/operators';

import * as UserActions from './users.actions';
import { LoginService } from '@services/api/login.service';
import { SnackService } from '@core/services/snack/snack.service';
import { UserService } from '@services/api/users.service';
import { StorageService } from '@services/storage/storage.service';
import { LOGIN_SENTENCE, LOGOUT_SENTENCE, REGISTER_SENTENCE } from '@shared/data/sentences';

@Injectable()

export class UserEffects {

  constructor(
    private actions: Actions,
    private loginSrv: LoginService,
    private userSrv: UserService,
    private ls: StorageService,
    private router: Router,
    private snakSrv: SnackService
  ) { }

  // LOGIN USER
  loginUserEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.login),
      concatMap((action) =>
      this.loginSrv.signIn(action.name, action.password)
        .pipe(
          tap(_ => this.navigate('/profile', LOGIN_SENTENCE)),
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

  // USER LOGOUT
  logOutEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.userLogOut),
      tap(_ => (
        this.ls.setKey('token', null),
        this.navigate('/', LOGOUT_SENTENCE)
      ))
    ), { dispatch: false }
  );

  private navigate(
    path: string, 
    sentence: string,
    type = 'info'
  ): void {
    this.router.navigateByUrl(path);
    this.snakSrv.setSnack(sentence, type);
  }

}