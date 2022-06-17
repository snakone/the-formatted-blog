import { Injectable } from '@angular/core';
import { Post } from '@shared/types/interface.types';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

@Injectable()

export class QuillService {

  constructor() { }

  public convertToHTML(draft: Post): void {
    const config = { multiLineParagraph: false };
    var html = new QuillDeltaToHtmlConverter(draft.message.ops, config);
    const converted = encodeURIComponent(html.convert());
    const input = document.createElement('a');
    input.setAttribute('href', 'data:text;charset=utf-8,' + converted);
    input.setAttribute('download', `${draft.title}.txt`);
    input.click();
  }

}