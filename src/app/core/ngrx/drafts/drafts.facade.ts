import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeyPair, Post } from '@shared/types/interface.types';
import { Delta } from 'quill';

import * as DraftActions from './drafts.actions';
import { DraftsState } from './drafts.reducer';
import * as fromDrafts from './drafts.selectors';

@Injectable({providedIn: 'root'})

export class DraftsFacade {

  drafts$ = this.store.select(fromDrafts.get);
  loaded$ = this.store.select(fromDrafts.getLoaded);
  active$ = this.store.select(fromDrafts.getActive);
  saving$ = this.store.select(fromDrafts.getSaving);

  constructor(private store: Store<DraftsState>) { }

  public get(): void {
    this.store.dispatch(DraftActions.getByUser());
  }

  public getBySlug(slug: string): void {
    this.store.dispatch(DraftActions.getBySlug({slug}));
  }

  public create(draft: Post): void {
    this.store.dispatch(DraftActions.create({draft}));
  }

  public update(draft: Post): void {
    this.store.dispatch(DraftActions.update({draft}));
  }

  public updateKey(id: string, keys: KeyPair): void {
    this.store.dispatch(DraftActions.updateKey({id, keys}));
  }

  public delete(id: string): void {
    this.store.dispatch(DraftActions.deleteDraft({id}));
  }

  public setActive(draft: Post): void {
    this.store.dispatch(DraftActions.setActive({draft}));
  }

  public setSaving(value: boolean): void {
    this.store.dispatch(DraftActions.setSaving({value}));
  }

  public activeOff(): void {
    this.store.dispatch(DraftActions.activeOff());
  }

  public reset(): void {
    this.store.dispatch(DraftActions.reset());
  }

  public resetBySlug(): void {
    this.store.dispatch(DraftActions.resetSlug());
  }

}