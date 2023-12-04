import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as SearchActions from './search.actions';
import { map, concatMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SearchService } from '@core/services/api/search.service';
import * as fromUsers from '@store/users/users.selectors';

@Injectable()

export class SearchEffects {

  constructor(
    private actions: Actions,
    private searchSrv: SearchService,
    private store: Store<any>,
  ) { }

  // SEARCH
  searchEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(SearchActions.fullSearch),
      withLatestFrom(this.store.select(fromUsers.get)),
      concatMap(([action, user]) =>
      this.searchSrv.search(action.value, user?._id)
        .pipe(
          map(result => SearchActions.fullSearchSuccess({ result, value: action.value })),
          catchError(error =>
              of(SearchActions.fullSearchFailure({ error: error.message }))
    ))))
  );

}