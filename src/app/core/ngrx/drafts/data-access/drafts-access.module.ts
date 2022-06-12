
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { draftsReducers } from '../../ngrx.index';
import { DraftsEffects } from '../drafts.effects';
import { DraftsFacade } from '../drafts.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('DraftsState', draftsReducers),
    EffectsModule.forFeature([
      DraftsEffects
    ]),
  ],
  providers: [DraftsFacade]
})

export class DraftsAccessModule { }