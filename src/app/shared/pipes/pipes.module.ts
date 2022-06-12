import { NgModule } from '@angular/core';

import { ImagePipe } from './image/image.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { ShortMessagePipe } from './short-message/short-message.pipe';
import { DraftStatusPipe } from './draft-status/draft-status.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    SanitizerPipe,
    ShortMessagePipe,
    DraftStatusPipe,
  ],
  exports: [
    ImagePipe,
    SanitizerPipe,
    ShortMessagePipe,
    DraftStatusPipe
  ]
})

export class PipesModule { }
