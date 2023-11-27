import { QuillHelpItem } from "@shared/types/interface.post";
import { QuillEditorComponent, QuillModules, QuillToolbarConfig } from "ngx-quill";
import { HISTORY_KEY } from "./constants";

export const QUILL_MODULES = (editor: QuillEditorComponent): QuillModules => ({
  syntax: true,
  toolbar: {
    container: QUILL_CONTAINER,
    handlers: {
      'undo': () => editor.quillEditor.getModule(HISTORY_KEY).undo(),
      'redo': () => editor.quillEditor.getModule(HISTORY_KEY).redo(),
    }
  },
  imageCompress: {
    quality: 0.5,
    maxWidth: 600, 
    maxHeight: 350, 
    debug: false, 
  },
  history: { delay: 2000, userOnly: false },
});

export const EMPTY_QUILL = {
  "ops": [{"insert": "\n"}]
};

export const QUILL_CONTAINER: string | string[] | QuillToolbarConfig = [
  ['bold'],
  ['blockquote', 'code-block'],
  [{ 'header': 2 }, { 'header': 3 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['undo' , 'redo'],
  ['link', 'image', 'video']
];

export const HEADER_3_QUILL_ICON: string = `<svg viewBox="0 0 18 18">
<path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,
1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,
1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,
.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,
1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,
10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/>
</svg>`;

export const QUILL_HELP_ITEMS_TOOLBAR: QuillHelpItem[] = [
  {
    icon: 'fas fa-bold',
    label: 'Negrita',
    message: `La función de negrita te brinda la capacidad de resaltar 
              con énfasis palabras o frases esenciales en tu texto. Este énfasis no solo capta la atención del lector, 
              sino que también comunica la importancia de la información que estás presentando, creando 
              así un impacto visual y comunicativo significativo en tu contenido.`
  },
  {
    icon: 'fas fa-quote-right',
    label: 'Cita (Blockquote)',
    message: `Utiliza esta función para resaltar bloques de texto que son citas o información <strong>relevante</strong>. 
              Selecciona el párrafo que deseas transformar en una cita y haz clic en el botón. 
              Esto aplicará un formato especial al texto, destacándolo del resto y proporcionando un aspecto distintivo de citación.`
  },
  {
    icon: 'fas fa-code',
    label: 'Código',
    message: `Utiliza este botón cuando desees incorporar segmentos de código de <strong>programación</strong> en tu documento. 
              Selecciona el código que deseas resaltar y haz clic en el botón. Esto mejorará la legibilidad al destacar la sintaxis del código.`
  },
  {
    icon: 'fas fa-heading',
    label: 'Encabezados',
    message: `Utiliza estos botones para estructurar tu contenido con niveles de encabezado. 
              Selecciona el texto que deseas convertir en un encabezado y elige entre <strong>H2</strong> o 
              <strong>H3</strong> según la importancia de la sección.<br><br>
              - Usa los encabezados <strong>H2</strong> para secciones principales. Este encabezado tiene estilos adicionales.<br>
              - Los encabezados <strong>H3</strong> son utilizados para subsecciones o detalles específicos.`
  },
  {
    icon: 'fas fa-list-ol',
    label: 'Lista numerada',
    message: `Utiliza este botón para crear listas ordenadas y numeradas. Selecciona los elementos que deseas incluir 
              en la lista y haz clic en el botón de lista <strong>ordenada</strong>. Esto dará formato a tus elementos de manera secuencial.`
  },
  {
    icon: 'fas fa-list-ul',
    label: 'Lista desordenada',
    message: `Utiliza este botón para crear listas desordenadas y no numeradas. Selecciona los elementos que deseas incluir 
              en la lista y haz clic en el botón de lista <strong>desordenada</strong>. 
              A diferencia de la lista numerada, esto dará formato a tus elementos sin seguir un orden específico.`
  },
  {
    icon: 'fas fa-undo',
    label: 'Deshacer',
    message: `Utiliza este botón para <strong>revertir</strong> las acciones recientes en tu documento. Si cometes un error o realizas 
              cambios no deseados, puedes deshacerlos fácilmente haciendo clic en el botón. 
              El editor de texto guarda un historial de acciones, permitiéndote deshacer múltiples pasos.`
  },
  {
    icon: 'fas fa-redo',
    label: 'Rehacer',
    message: `Utiliza este botón para aplicar nuevamente acciones que hayas deshecho previamente en tu documento. 
              Si has utilizado la función <strong>"Deshacer"</strong> y decides volver a realizar un cambio que habías revertido, 
              puedes hacer clic en el botón. El editor de texto guarda un historial de acciones, 
              permitiéndote tanto deshacer como rehacer múltiples pasos.`
  },
  {
    icon: 'fas fa-link',
    label: 'Insertar enlace',
    message: `Utiliza este botón cuando desees agregar un enlace a una página <strong>web externa</strong> en tu documento. 
              Selecciona el texto que quieres convertir en un enlace y haz clic en el botón de enlace externo. A continuación, 
              ingresa la <strong>URL</strong> completa del sitio web al que deseas vincular el texto.`
  },
  {
    icon: 'fas fa-image',
    label: 'Insertar imagen',
    message: `Utiliza este botón para agregar imágenes a tu documento. Haz clic en el botón de inserción de imagen y selecciona la 
              imagen que deseas incorporar. El editor de texto te permitirá insertar la imagen y automáticamente 
              <strong>comprimirá</strong> el archivo para que ocupe menos espacio, facilitando así la gestión del tamaño del documento.`
  },
  {
    icon: 'fas fa-photo-video',
    label: 'Insertar vídeo',
    message: `Utiliza este botón para incorporar videos a tu documento. Haz clic en el botón de inserción de video, 
              proporciona el enlace del video que deseas agregar desde plataformas de terceros como <strong>YouTube</strong> o <strong>Vimeo</strong>. 
              El editor de texto facilitará la inclusión del video, permitiendo que los lectores visualicen el contenido multimedia directamente en el documento.`
  },
];

export const QUILL_HELP_ITEMS_ACTIONS: QuillHelpItem[] = [
  {
    icon: 'fas fa-plus',
    label: 'Nuevo Boceto',
    message: `Utiliza este botón para crear un <strong>nuevo boceto</strong> en blanco. Antes de descartar el boceto actual, podrás guardarlo. 
              Después de guardarse correctamente, el nuevo boceto aparecerá en la lista de bocetos situado en la parte izquierda.`
  },
  {
    icon: 'far fa-eye',
    label: 'Previsualizar',
    message: `Este botón sirve para previsualizar el boceto en cualquier momento. Ten en cuenta que esta previsualización es <strong>idéntica</strong>
              a como se vería el boceto une vez publicado. Lo único que puedes echar en falta es el índice.
              Aunque que no tienes por que preocuparte por eso, ya que el índice se crea automaticamente`
  },
  {
    icon: 'fas fa-broom',
    label: 'Limpiar',
    message: `Esta acción limpiará todo el contenido actual del boceto para que puedas <strong>empezar de nuevo</strong>. Recuerda que puedes usar el
              botón "Deshacer" si has limpiado algo por error y quieres volver al estado anterior.`
  },
  {
    icon: 'far fa-trash-alt',
    label: 'Eliminar',
    message: `Acción <strong>irreversible</strong>. Borra un boceto permanentemente. Se te preguntará antes si estás seguro de hacerlo. La lista de bocetos
              situada en la parte izquierda se actualizará automaticamente.`
  },
  {
    icon: 'fas fa-cloud-download-alt',
    label: 'Descargar HTML',
    message: `Utiliza este botón para generar un archivo <strong>HTML</strong> con el contenido actual del boceto. Este archivo HTML cuenta
              con los mismos estilos como si estuviera dentro de la aplicación. Es perfecto para tener una copia de tu trabajo y/o compartirlo de forma rápida.`
  },
  {
    icon: 'fas fa-spell-check',
    label: 'Formulario',
    message: `Este botón es el mas <strong>importante</strong> de todos. Es un formulario <strong>obligatorio</strong> en dónde deberás añadir la siguiente información.
              Una vez todos los campos del formulario sean correctos, los datos se guardarán automaticamente.
              <br><br>
              - Nombre del artículo<br>
              - Categoría (Podrás elegir una de las opciones)<br>
              - Foto de portada (URL)<br>
              - Una introducción<br>`
  },
];


