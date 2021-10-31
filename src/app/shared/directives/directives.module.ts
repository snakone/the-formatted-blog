import { NgModule } from '@angular/core';
import { StickyDirective } from './sticky/sticky.directive';
import { NavDirective } from './nav/nav.directive';

@NgModule({
  declarations: [
    StickyDirective,
    NavDirective
  ],
  exports: [
    StickyDirective,
    NavDirective
  ]
})

export class DirectivesModule { }
