import { NgModule } from '@angular/core';

import { ImagePipe } from './image/image.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    SanitizerPipe,
  ],
  exports: [
    ImagePipe,
    SanitizerPipe
  ]
})

export class PipesModule { }
