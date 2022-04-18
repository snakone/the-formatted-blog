import { NgModule } from '@angular/core';
import { QuillConfig, QuillModule } from 'ngx-quill';

const config: QuillConfig = {
  format: 'object',
  placeholder: 'Empieza escribiendo aquí... Si tienes dudas, usa el botón de ayuda en la parte inferior'
}

@NgModule({
  imports: [
    QuillModule.forRoot(config)
  ]
})

export class QuillFormatModule { }