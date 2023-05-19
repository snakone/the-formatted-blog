import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx.index';

import * as PostActions from './posts.actions';
import * as fromPosts from './posts.selectors';
import { FilterType, Post } from '@shared/types/interface.types';

@Injectable({providedIn: 'root'})

export class PostsFacade {

  posts$ = this.store.select(fromPosts.get);
  filtered$ = this.store.select(fromPosts.getFiltered);
  favorites$ = this.store.select(fromPosts.getFavorites);
  favoritesID$ = this.store.select(fromPosts.getFavoritesID);
  loaded$ = this.store.select(fromPosts.getLoaded);
  getFull$ = this.store.select(fromPosts.getFull);
  byUser$ = this.store.select(fromPosts.getByUser);
  byUserLoaded$ = this.store.select(fromPosts.getByUserLoaded);
  bySlug$ = this.store.select(fromPosts.getBySlug);
  byID$ = (id: string) => this.store.select(fromPosts.getById(id));

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