import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as ActivityActions from './activities.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActivitiesState } from './activities.reducer';
import { ActivitiesService } from '@core/services/api/activities.service';

@Injectable()

export class ActivitiesEffects {

  constructor(
    private actions: Actions,
    private activitiesSrv: ActivitiesService,
    private store: Store<ActivitiesState>,
  ) { }

  // GET ACTIVITIES
  getActivitiesEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(ActivityActions.get),
      concatMap(() =>
      this.activitiesSrv.getUserActivities()
        .pipe(
          map(activities => ActivityActions.getSuccess({ activities })),
          catchError(error =>
              of(ActivityActions.getFailure({ error: error.message }))
    ))))
  );

}