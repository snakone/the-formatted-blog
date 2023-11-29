import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as NewsActions from './news.actions';
import * as fromNews from './news.selectors';
import { NewsState } from './news.reducer';

@Injectable()

export class NewsFacade {

  public news$ = this.store.select(fromNews.get);
  public loaded$ = this.store.select(fromNews.getLoaded);

  constructor(private store: Store<NewsState>) { }

  public get(): void {
    this.store.dispatch(NewsActions.get());
  }

}