import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, concatMap, catchError, tap } from 'rxjs/operators';

import * as UserActions from './users.actions';
import { LoginService } from '@services/api/login.service';
import { UserService } from '@services/api/users.service';
import { StorageService } from '@services/storage/storage.service';
import { LOGIN_SENTENCE, LOGOUT_SENTENCE, REGISTER_SENTENCE } from '@shared/data/sentences';
import { PWAService } from '@core/services/pwa/pwa.service';
import { WELCOME_PUSH } from '@shared/data/notifications';
import { firstValueFrom } from 'rxjs';
import { CrafterService } from '@core/services/crafter/crafter.service';

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

  // USER LOGOUT
  logOutEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.userLogOut),
      tap(_ => this.resetUser())
    ), { dispatch: false }
  );

  private navigate(
    path: string | null, 
    sentence: string,
    sw: boolean = false
  ): void {
    if (path) this.router.navigateByUrl(path);
    this.crafter.setSnack(sentence, 'info');
    if (sw) firstValueFrom(this.sw.send(WELCOME_PUSH)).then();
  }

  private resetUser(): void {
    this.ls.setKey('token', null);
    this.userSrv.setUser(null);
    this.navigate('/', LOGOUT_SENTENCE)
  }

}