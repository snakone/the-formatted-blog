import { NgModule } from '@angular/core';
import { QuillConfig, QuillModule } from 'ngx-quill';

const config: QuillConfig = {
  format: 'object',
  placeholder: 'Empieza escribiendo aquí...'
}

@NgModule({
  imports: [
    QuillModule.forRoot(config)
  ]
})

export class QuillFormatModule { }