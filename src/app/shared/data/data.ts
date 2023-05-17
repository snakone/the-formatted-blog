import { ActionList, CheckStatusList, ConfirmationDialogProps, IconList, Post, TextList } from '@shared/types/interface.types';
import { OwlOptions } from 'ngx-owl-carousel-o';

export const CARROUSEL_OPTS: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  margin: 20,
  lazyLoad: true,
  responsiveRefreshRate: 100,
  fluidSpeed: true,
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    992: { items: 3 }
  }
};

export const DUMMY_POST: Post[] = [
  {
    _id: '1',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING.',
    category: 'Home & Living',
    author: 'Elisa Park',
    created: 'Sep, 10 2019',
    cover: 'assets/images/05-img.jpg',
    status: 'not-seen',
    type: 'post',
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum. Integer sem dui, porttitor ac mi in, consequat imperdiet lacus. Maecenas ornare orci sit amet leo dictum, a aliquet magna cursus. Curabitur et ligula gravida, dapibus lectus et, gravida eros. Aenean lacinia sapien vel tortor dignissim, commodo tincidunt dolor eleifend. Vestibulum tempor semper ipsum, nec tincidunt eros consectetur quis. Curabitur luctus ex at massa tincidunt, sit amet tincidunt libero dapibus. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum.' 
  },
  {
    _id: '2',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Amazing Food',
    author: 'Marisa Hudson',
    created: 'Jun, 26 2019',
    status: 'not-seen',
    type: 'post',
    cover: 'assets/images/05-img.jpg',
    user: '62262ead2aed27b93083e607',
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum. Integer sem dui, porttitor ac mi in, consequat imperdiet lacus. Maecenas ornare orci sit amet leo dictum, a aliquet magna cursus. Curabitur et ligula gravida, dapibus lectus et, gravida eros. Aenean lacinia sapien vel tortor dignissim, commodo tincidunt dolor eleifend. Vestibulum tempor semper ipsum, nec tincidunt eros consectetur quis. Curabitur luctus ex at massa tincidunt, sit amet tincidunt libero dapibus. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum.' 
  },
  {
    _id: '3',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Lifestyle',
    author: 'Jhone Albert',
    created: 'Sep, 17 2015',
    status: 'pending',
    type: 'post',
    cover: 'assets/images/05-img.jpg'
  },
  {
    _id: '4',
    title: 'Sed quis sollicitudin eros, non lobortis purus.',
    category: 'Travel',
    author: 'Albert Jhone',
    created: 'Dec, 10 2016',
    status: 'approved',
    type: 'post',
    cover: 'assets/images/05-img.jpg'
  },
  {
    _id: '5',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Miscellenious',
    author: 'Alfred Hannog',
    created: 'Jan, 05 2016',
    status: 'seen',
    type: 'post',
    cover: 'assets/images/05-img.jpg'
  }
];

export const USER_INDEX: IconList[] = [
  { icon: 'far fa-user-circle', label: 'Perfil', route: './' },
  { icon: 'fab fa-ioxhost', label: 'Posts', route: 'posts' },
  { icon: 'fas fa-file-signature', label: 'Bocetos', route: 'drafts' },
  { icon: 'fas fa-users', label: 'Amigos', route: 'friends' },
  { icon: 'far fa-star', label: 'Favoritos', route: 'favorites'},
  { icon: 'fas fa-cog', label: 'Ajustes', route: 'settings' }
];

export const CREATE_ACTION_LIST: ActionList[] = [
  { icon: 'fas fa-plus', label: 'Nuevo...', action: 'new' },
  { icon: 'fas fa-external-link-alt', label: 'Previsualizar', action: 'preview' },
  { icon: 'fas fa-broom', label: 'Limpiar', action: 'clean' },
  { icon: 'fas fa-trash', label: 'Eliminar', action: 'delete' },
  { icon: 'fas fa-cloud-download-alt', label: 'Descargar en HTML', action: 'download' },
];

export const SAVE_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Nuevo...',
  message: '¿Quieres guardar el boceto actual y crear uno nuevo?'
};

export const DELETE_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Eliminar...',
  message: '¿Estás seguro que quieres eliminar este boceto?'
};

export const PUBLISH_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Publicar...',
  message: '¿Estás seguro que quieres publicar este boceto?'
};

export const EDIT_POST_CONFIRMATION: ConfirmationDialogProps = {
  title: 'Editar artículo...',
  message: '¿Estás seguro que quieres editar este artículo? Recuerda que si lo editas, volverá al estado de boceto.'
};

export const POST_CATEGORIES: TextList[] = [
  { label: 'Actualidad', key: 'news' },
  { label: 'Naturaleza', key: 'nature' },
  { label: 'Cultura', key: 'culture' },
  { label: 'Ciéncia', key: 'science' },
  { label: 'Política', key: 'politics' },
  { label: 'Ingeniería', key: 'engine' },
  { label: 'Humor', key: 'fun' },
  { label: 'Internet', key: 'internet' },
  { label: 'Videojuegos', key: 'games' },
  { label: 'Filosofía', key: 'filosofy' },
  { label: 'Otras...', key: 'others' }
];

export const POST_ICONS: ActionList[] = [
  { 
    icon: 'fab fa-twitter',
    label: 'Compartir',
    action: 'share'
  },
  { 
    icon: 'fas fa-user-plus',
    label: 'Añadir',
    action: 'friend'
  },
  { 
    icon: 'far fa-envelope',
    label: 'Mensaje',
    action: 'message'
  }
];

export const DRAFT_ICONS: ActionList[] = [
  { 
    icon: 'fas fa-pen-fancy',
    label: 'Editar',
    action: 'edit'
  },
  { 
    icon: 'fas fa-external-link-alt',
    label: 'Previsualizar',
    action: 'preview'
  },
  { 
    icon: 'fas fa-cloud-download-alt',
    label: 'Descargar',
    action: 'download'
  },
  { 
    icon: 'fas fa-trash',
    label: 'Eliminar',
    action: 'delete'
  }
];

export const NAVBAR_MENU = [
  'Home',
  'About us',
  'Contact',
  'Travel',
  'Politics'
];

export const NAVBAR_ICONS: IconList[]  = [
  { icon: 'far fa-file-alt', route: '/news' },
  { icon: 'fas fa-question', route: '/help' }
];

// DRAFT CHECK
export const CHECKSTATUS: CheckStatusList[] = [
  {
    name: 'Título',
    hint: 'Título claro y conciso.',
    icon: 'fas fa-hashtag',
    prop: 'title',
    checkProp: 'hasGoodTitle',
    checkMessage: 'El boceto cumple con los requisitos de un buen <strong>título</strong>.',
    cause: '¿Por qué el título no cumple los requisitos?',
    desc: `<p>
              Un buen <strong>título</strong> es corto y descriptivo. Solo con leerlo deberías
              ser capaz de identificar que tipo de contenido vas a encontrar dentro.
              También puedes dar una idea del título con una pregunta. "¿Es la ciberseguridad una
              opción segura?", "¿Es ChatGPT el futuro?". No olvides que el lector decide si seguir
              leyendo después de leer el título.
           </p>`
  },
  {
    name: 'Categoría',
    hint: 'Categoría acorde al tema.',
    icon: 'far fa-folder',
    prop: 'category',
    checkProp: 'hasGoodCategory',
    checkMessage: 'El boceto tiene una <strong>categoría</strong> relacionada.',
    cause: '¿Por qué la categoría no cumple los requisitos?',
    desc: `<p>
              Después de echar un ojo al boceto podrás decidir si la <strong>categoría</strong>
              corresponde con la proporcionada. Ten en cuenta que es posible que un tema
              abarque dos o más categorías, intenta aprobar la más acorde.
           </p>`
  },
  {
    name: 'Imagen',
    hint: 'Formato de la imagen correcto.',
    icon: 'far fa-image',
    prop: 'cover',
    checkProp: 'hasGoodCover',
    checkMessage: 'El boceto tiene una buena <strong>imagen</strong> de portada y pesa menos de <strong>150kb</strong>.',
    cause: '¿Por qué la imagen no cumple los requisitos?',
    desc: `<p>
            ¿Te gusta la <strong>imagen</strong> que ves? Esta imagen se usará como portada para el Artículo
            y será lo primero que verá el lector. Es muy importante que esté relacionada
            con el boceto de alguna manera. Además no podrá superar los 100kb. Esto es
            así para que la página cargue lo más rápido posible.
          </p>`
  },
  {
    name: 'Introducción',
    hint: 'Introducción cumple los requisitos.',
    icon: 'fas fa-address-card',
    prop: 'intro',
    checkProp: 'hasGoodIntro',
    checkMessage: 'El boceto tiene una <strong>introducción</strong> correcta.',
    cause: '¿Por qué la introducción no cumple los requisitos?',
    desc: `<p>
            Escribir una buena <strong>introducción</strong> es esencial para que el lector haga
            click en el Artículo para leerlo entero. Son las primeras letras del Artículo, así
            que tienen que atraer al lector de una manera rápida y directa.
          </p>`
  }
];
