import { NgModule } from '@angular/core';
import { QUILL_PLACEHOLDER } from '@shared/data/sentences';
import { QuillConfig, QuillModule } from 'ngx-quill';
import Quill from 'quill';
import ImageCompress from 'quill-image-compress';
import { QuillService } from './quill.service';
import Focus from 'quill-focus';

const Header = Quill.import('formats/header');

class CustomHeader extends Header {
  constructor(node: QuillBlot) {
    super(node);

    setTimeout(() => {
      const id = slugify(
        node.__blot?.blot?.children?.head?.text || ''
      ) || '';
      node.setAttribute('id', id);
    }, 100);
  }
}

Quill.register(CustomHeader, true);
Quill.register('modules/imageCompress', ImageCompress, true);
// Quill.register('modules/focus', Focus);

const config: QuillConfig = {
  format: 'object',
  placeholder: QUILL_PLACEHOLDER,
}

@NgModule({
  imports: [
    QuillModule.forRoot(config)
  ],
  providers: [QuillService]
})

export class QuillFormatModule { }

interface QuillBlot {
  __blot: { blot: { children: { head: { text: string }}}};
  setAttribute: (id: string, value: string) => void;
}

export const slugify = ( text: string ) => {
  return text
  .toString()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'')
  .toLowerCase()
  .trim()
  .replace('.', '-')
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-'); 
};