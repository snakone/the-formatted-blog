import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextSliderComponent } from './text-slider/text-slider.component';
import { FormErrorComponent } from './form-error/form-error.component';

@NgModule({
  declarations: [
    TextSliderComponent,
    FormErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextSliderComponent,
    FormErrorComponent
  ]
})

export class SnippetsModule { }
