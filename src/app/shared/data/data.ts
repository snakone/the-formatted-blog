import { ActionList, DraftList, IconList, Post } from '@shared/types/interface.types';
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
    image: '05-img.jpg'
  },
  {
    _id: '2',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Amazing Food',
    author: 'Marisa Hudson',
    created: 'Jun, 26 2019',
    image: '05-img.jpg'
  },
  {
    _id: '3',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Lifestyle',
    author: 'Jhone Albert',
    created: 'Sep, 17 2015',
    image: '05-img.jpg'
  },
  {
    _id: '4',
    title: 'Sed quis sollicitudin eros, non lobortis purus.',
    category: 'Travel',
    author: 'Albert Jhone',
    created: 'Dec, 10 2016',
    image: '05-img.jpg'
  },
  {
    _id: '5',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Miscellenious',
    author: 'Alfred Hannog',
    created: 'Jan, 05 2016',
    image: '05-img.jpg'
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

export const DRAFT_LIST: DraftList[] = [
  { 
    ref: 'Boceto 1', 
    title: 'Lorem ipsum dolor sit amet duaron. Lorem ipsum dolor sit amet duaron.', 
    created: '2:32pm',
    status: 'correct',
    active: false
  },
  { 
    ref: 'Boceto 2', 
    title: 'Lorem ipsum dolor sit amet duaron. Lorem ipsum dolor sit amet duaron.', 
    created: '2:32pm',
    status: 'not-seen',
    active: false
  },
  { 
    ref: 'Boceto 3', 
    title: 'Lorem ipsum dolor sit amet duaron.', 
    created: 'hace 2 días',
    status: 'pending',
    active: false
  },
  { 
    ref: 'Boceto 4', 
    title: 'Lorem ipsum dolor amet duaron.', 
    created: '5:32pm',
    status: 'correct',
    active: false
  },
  { 
    ref: 'Boceto 5', 
    title: 'Lorem ipsum dolor sit amet duaron.', 
    created: '2:32pm',
    status: 'seen',
    active: false
  },
];

export const CREATE_ACTION_LIST: ActionList[] = [
  { icon: 'fas fa-plus', label: 'Nuevo...', action: 'new' },
  // { icon: 'far fa-folder-open', label: 'Archivar', action: 'archive' },
  { icon: 'fas fa-trash', label: 'Eliminar', action: 'delete' },
  { icon: 'far fa-question-circle', label: 'Ayuda', action: 'help' }
];


