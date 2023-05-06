import { ActionList, IconList, Post, TextList } from '@shared/types/interface.types';
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
    cover: '05-img.jpg',
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum. Integer sem dui, porttitor ac mi in, consequat imperdiet lacus. Maecenas ornare orci sit amet leo dictum, a aliquet magna cursus. Curabitur et ligula gravida, dapibus lectus et, gravida eros. Aenean lacinia sapien vel tortor dignissim, commodo tincidunt dolor eleifend. Vestibulum tempor semper ipsum, nec tincidunt eros consectetur quis. Curabitur luctus ex at massa tincidunt, sit amet tincidunt libero dapibus. Cras hendrerit nulla quam. Ut ex sapien, facilisis nec pellentesque vitae, consectetur sed ipsum.' 
  },
  {
    _id: '2',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Amazing Food',
    author: 'Marisa Hudson',
    created: 'Jun, 26 2019',
    cover: '05-img.jpg'
  },
  {
    _id: '3',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Lifestyle',
    author: 'Jhone Albert',
    created: 'Sep, 17 2015',
    cover: '05-img.jpg'
  },
  {
    _id: '4',
    title: 'Sed quis sollicitudin eros, non lobortis purus.',
    category: 'Travel',
    author: 'Albert Jhone',
    created: 'Dec, 10 2016',
    cover: '05-img.jpg'
  },
  {
    _id: '5',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Miscellenious',
    author: 'Alfred Hannog',
    created: 'Jan, 05 2016',
    cover: '05-img.jpg'
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
  { icon: 'fas fa-cloud-download-alt', label: 'Descargar', action: 'download' },
];

export const SAVE_CONFIRMATION = {
  title: 'Nuevo...',
  message: '¿Quieres guardar el boceto actual y crear uno nuevo?'
};

export const DELETE_CONFIRMATION = {
  title: 'Eliminar...',
  message: '¿Estás seguro que quieres eliminar este boceto?'
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

export const POST_ICONS = [
  'fab fa-twitter',
  'fab fa-linkedin-in',
  'fas fa-user-plus',
  'far fa-envelope'
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
  },
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
