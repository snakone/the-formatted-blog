import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '@shared/types/interface.types';
import { AppState } from '../ngrx.index';
import * as UserActions from './users.actions';
import * as fromUsers from './users.selectors';

@Injectable({providedIn: 'root'})

export class UsersFacade {

  public user$ = this.store.select(fromUsers.get);

  constructor(private store: Store<AppState>) { }

  public login(name: string, password: string): void {
    this.store.dispatch(UserActions.login({ name, password }));
  }

  public register(user: User): void {
    this.store.dispatch(UserActions.register({user}));
  }

  public logOut(): void {
    this.store.dispatch(UserActions.userLogOut());
  }

  public verifyToken(): void {
    this.store.dispatch(UserActions.verifyToken());
  }

  public refreshToken(id: string): void {
    this.store.dispatch(UserActions.refreshToken({id}));
  }

  public update(user: User): void {
    this.store.dispatch(UserActions.update({user}));
  }

}