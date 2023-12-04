import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SearchActions from './search.actions';
import * as fromSearch from './search.selectors';
import { SearchState } from './search.reducer';

@Injectable({providedIn: 'root'})

export class SearchFacade {

  public result$ = this.store.select(fromSearch.getresult);
  public loaded$ = this.store.select(fromSearch.getLoaded);
  public value$ = this.store.select(fromSearch.getSearchValue);

  constructor(private store: Store<SearchState>) { }

  public search(value: string): void {
    this.store.dispatch(SearchActions.fullSearch({value}));
  }

  public reset(): void {
    this.store.dispatch(SearchActions.reset());
  }

}