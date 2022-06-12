import { IconList } from "@shared/types/interface.types";
import { QuillToolbarConfig } from "ngx-quill";
import { Delta } from "quill";

export const EMPTY_QUILL = {
  "ops": [{"insert": "\n"}]
};

export const QUILL_HELP_TOP_BAR: IconList[] = [
  { icon: 'format_bold', label: 'Negrita' },
  { icon: 'format_quote', label: 'Cita (Blockquote)' },
  { icon: 'code', label: 'Código de programación' },
  { icon: 'H2', label: 'Encabezado' },
  { icon: '', label: 'Lista númerada' },
  { icon: '', label: 'Lista' },
  { icon: '', label: 'Deshacer' },
  { icon: '', label: 'Rehacer' },
  { icon: '', label: 'Insertar enlace' },
  { icon: '', label: 'Insertar imagen' },
  { icon: '', label: 'Insertar vídeo' },
];

export const QUILL_CONTAINER: string | string[] | QuillToolbarConfig = [
  ['bold'],
  ['blockquote', 'code-block'],
  [{ 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['undo' , 'redo'],
  ['link', 'image', 'video'],
];


