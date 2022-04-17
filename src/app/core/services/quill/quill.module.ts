import { NgModule } from '@angular/core';
import { QuillConfig, QuillModule } from 'ngx-quill';

const modules: QuillModule = {
  syntax: true,
  toolbar: [
    ['bold'],
    ['blockquote', 'code-block'],
    [{ 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image', 'video']
  ],
}

const config: QuillConfig = {
  modules,
  format: 'object'
}

@NgModule({
  imports: [
    QuillModule.forRoot(config)
  ]
})

export class QuillFormatModule { }