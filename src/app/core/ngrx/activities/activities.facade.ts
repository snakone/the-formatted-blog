import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ActivityActions from './activities.actions';
import * as fromActivities from './activities.selectors';
import { ActivitiesState } from './activities.reducer';

@Injectable({providedIn: 'root'})

export class ActivitiesFacade {

  public activities$ = this.store.select(fromActivities.get);
  public loaded$ = this.store.select(fromActivities.getLoaded);

  constructor(private store: Store<ActivitiesState>) { }

  public get(): void {
    this.store.dispatch(ActivityActions.get());
  }

  public reset(): void {
    this.store.dispatch(ActivityActions.reset());
  }

}