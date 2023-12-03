import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../ngrx.index';
import * as UserActions from './users.actions';
import * as fromUsers from './users.selectors';
import { User } from '@shared/types/interface.user';
import { FilterType } from '@shared/types/interface.app';

@Injectable({providedIn: 'root'})

export class UsersFacade {

  public user$ = this.store.select(fromUsers.get);
  public friends$ = this.store.select(fromUsers.getFriends);
  public public$ = this.store.select(fromUsers.getPublic);
  public filteredFriendsd$ = this.store.select(fromUsers.getFilteredFriends);

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

  public addFriend(friend: User): void {
    this.store.dispatch(UserActions.addFriend({friend}));
  }

  public removeFriend(id: string): void {
    this.store.dispatch(UserActions.removeFriend({id}));
  }

  public setPublic(user: User): void {
    this.store.dispatch(UserActions.setPublic({user}));
  }

  public setFilter(value: FilterType): void {
    this.store.dispatch(UserActions.setFilter({value}));
  }

  public resetFilter(): void {
    this.store.dispatch(UserActions.resetFilter());
  }

}