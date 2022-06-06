import { NgModule } from '@angular/core';
import { QUILL_PLACEHOLDER } from '@shared/data/sentences';
import { QuillConfig, QuillModule } from 'ngx-quill';

const config: QuillConfig = {
  format: 'object',
  placeholder: QUILL_PLACEHOLDER
}

@NgModule({
  imports: [
    QuillModule.forRoot(config)
  ]
})

export class QuillFormatModule { }