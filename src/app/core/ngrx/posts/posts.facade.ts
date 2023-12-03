import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx.index';

import * as PostActions from './posts.actions';
import * as fromPosts from './posts.selectors';
import { Post } from '@shared/types/interface.post';
import { FilterType } from '@shared/types/interface.app';

@Injectable({providedIn: 'root'})

export class PostsFacade {

  public posts$ = this.store.select(fromPosts.get);
  public filtered$ = this.store.select(fromPosts.getFiltered);
  public favorites$ = this.store.select(fromPosts.getFavorites);
  public favoritesID$ = this.store.select(fromPosts.getFavoritesID);
  public loaded$ = this.store.select(fromPosts.getLoaded);
  public getFull$ = this.store.select(fromPosts.getFull);
  public byUser$ = this.store.select(fromPosts.getByUser);
  public byUserLoaded$ = this.store.select(fromPosts.getByUserLoaded);
  public bySlug$ = this.store.select(fromPosts.getBySlug);
  public byID$ = (id: string) => this.store.select(fromPosts.getById(id));

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

  public addFavorite(id: string): void {
    this.store.dispatch(PostActions.addFavorite({id}));
  }

  public removeFavorite(id: string): void {
    this.store.dispatch(PostActions.removeFavorite({id}));
  }

  public unPublish(post: Post): void {
    this.store.dispatch(PostActions.unPublish({post}));
  }

}