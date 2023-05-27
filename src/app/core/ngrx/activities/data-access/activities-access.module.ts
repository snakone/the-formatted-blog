
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { activitiesReducers } from '../../ngrx.index';
import { ActivitiesEffects } from '../activities.effects';
import { ActivitiesFacade } from '../activities.facade';
import { ActivitiesService } from '@core/services/api/activities.service';

@NgModule({
  imports: [
    StoreModule.forFeature('ActivitiesState', activitiesReducers),
    EffectsModule.forFeature([
      ActivitiesEffects
    ]),
  ],
  providers: [ActivitiesFacade, ActivitiesService]
})

export class ActivitiesAccessModule { }