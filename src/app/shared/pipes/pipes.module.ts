import { NgModule } from '@angular/core';

import { ImagePipe } from './image/image.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { ShortMessagePipe } from './short-message/short-message.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    SanitizerPipe,
    ShortMessagePipe,
  ],
  exports: [
    ImagePipe,
    SanitizerPipe,
    ShortMessagePipe
  ]
})

export class PipesModule { }
