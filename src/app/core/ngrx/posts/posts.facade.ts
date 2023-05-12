import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx.index';

import * as PostActions from './posts.actions';
import * as fromPosts from './posts.selectors';
import { FilterType } from '@shared/types/interface.types';

@Injectable({providedIn: 'root'})

export class PostsFacade {

  posts$ = this.store.select(fromPosts.get);
  filtered$ = this.store.select(fromPosts.getFiltered);
  loaded$ = this.store.select(fromPosts.getLoaded);
  getFull$ = this.store.select(fromPosts.getFull);
  byUser$ = this.store.select(fromPosts.getByUser);
  byUserLoaded$ = this.store.select(fromPosts.getByUserLoaded);
  bySlug$ = this.store.select(fromPosts.getBySlug);


  constructor(private store: Store<AppState>) { }

  public get(): void {
    this.store.dispatch(PostActions.get());
  }

  public getBySlug(slug: string): void {
    this.store.dispatch(PostActions.getBySlug({slug}));
  }

  public getByUser(id: string): void {
    this.store.dispatch(PostActions.getByUser({id}));
  }

  public reset(): void {
    this.store.dispatch(PostActions.reset());
  }

  public resetBySlug(): void {
    this.store.dispatch(PostActions.resetSlug());
  }

  public resetByUser(): void {
    this.store.dispatch(PostActions.resetByUser());
  }

  public setFilter(value: FilterType): void {
    this.store.dispatch(PostActions.setFilter({value}));
  }

  public resetFilter(): void {
    this.store.dispatch(PostActions.resetFilter());
  }

}