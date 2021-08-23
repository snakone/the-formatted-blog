import { NgModule } from '@angular/core';
import { StickyDirective } from './sticky.directive';

@NgModule({
  declarations: [
    StickyDirective
  ],
  exports: [
    StickyDirective
  ]
})

export class DirectivesModule { }
