import { QuillToolbarConfig } from "ngx-quill";

export const EMPTY_QUILL = {
  "ops": [{"insert": "\n"}]
};

export const QUILL_CONTAINER: string | string[] | QuillToolbarConfig = [
  ['bold'],
  ['blockquote', 'code-block'],
  [{ 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['undo' , 'redo'],
  ['link', 'image', 'video'],
];


