import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as NewsActions from './news.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NewsState } from './news.reducer';
import { NewsService } from '@core/services/api/news.service';

@Injectable()

export class NewsEffects {

  constructor(
    private actions: Actions,
    private newsSrv: NewsService,
    private store: Store<NewsState>,
  ) { }

  // GET NEWS
  getNewsEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(NewsActions.get),
      concatMap(() =>
      this.newsSrv.getNews()
        .pipe(
          map(news => NewsActions.getSuccess({ news })),
          catchError(error =>
              of(NewsActions.getFailure({ error: error.message }))
    ))))
  );

}