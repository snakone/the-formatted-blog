import { NgModule } from '@angular/core';

import { StickyDirective } from './sticky/sticky.directive';
import { NavDirective } from './nav/nav.directive';
import { TopDirective } from './top/top.directive';
import { CreateDraftService } from '@pages/create/services/create-draft.service';

@NgModule({
  declarations: [
    StickyDirective,
    NavDirective,
    TopDirective
  ],
  exports: [
    StickyDirective,
    NavDirective,
    TopDirective
  ],
  providers: [
    CreateDraftService
  ]
})

export class DirectivesModule { }
