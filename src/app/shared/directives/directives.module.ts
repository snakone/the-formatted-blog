import { NgModule } from '@angular/core';
import { StickyDirective } from './sticky/sticky.directive';
import { NavDirective } from './nav/nav.directive';
import { TopDirective } from './top/top.directive';

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
  ]
})

export class DirectivesModule { }
