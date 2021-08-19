import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextSliderComponent } from './text-slider/text-slider.component';

@NgModule({
  declarations: [
    TextSliderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextSliderComponent
  ]
})

export class SnippetsModule { }
