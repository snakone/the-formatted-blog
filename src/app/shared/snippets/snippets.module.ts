import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '@shared/directives/directives.module';
import { TextSliderComponent } from './text-slider/text-slider.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent
  ]
})

export class SnippetsModule { }
