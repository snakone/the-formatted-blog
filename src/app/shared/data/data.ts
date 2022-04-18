import { DraftList, IconList, Post } from '@shared/types/interface.types';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { POST_MESSAGE, POST_MESSAGE_ALONE } from './sentences';

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
    image: '05-img.jpg',
    message: POST_MESSAGE_ALONE
  },
  {
    _id: '2',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Amazing Food',
    author: 'Marisa Hudson',
    created: 'Jun, 26 2019',
    image: '05-img.jpg',
    message: POST_MESSAGE
  },
  {
    _id: '3',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Lifestyle',
    author: 'Jhone Albert',
    created: 'Sep, 17 2015',
    image: '05-img.jpg',
    message: POST_MESSAGE
  },
  {
    _id: '4',
    title: 'Sed quis sollicitudin eros, non lobortis purus.',
    category: 'Travel',
    author: 'Albert Jhone',
    created: 'Dec, 10 2016',
    image: '05-img.jpg',
    message: POST_MESSAGE_ALONE
  },
  {
    _id: '5',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Miscellenious',
    author: 'Alfred Hannog',
    created: 'Jan, 05 2016',
    image: '05-img.jpg',
    message: POST_MESSAGE
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
    title: 'Lorem ipsum dolor sit amet duaron.', 
    created: '2:32pm',
    badges: [
      { class: 'pending', label: 'Pendiente' },
      { class: 'success', label: 'Correcto' }
    ],
    active: false
  },
  { 
    ref: 'Boceto 2', 
    title: 'Lorem ipsum dolor sit amet duaron.', 
    created: '2:32pm',
    badges: [
      { class: 'denied', label: 'Denegado' },
      { class: 'view', label: 'Visto' },
    ],
    active: false
  },
  { 
    ref: 'Boceto 3', 
    title: 'Lorem ipsum dolor sit amet duaron.', 
    created: 'hace 2 días',
    badges: [
      { class: 'view', label: 'Visto' },
      { class: 'success', label: 'Correcto' }
    ],
    active: false
  },
  { 
    ref: 'Boceto 4', 
    title: 'Lorem ipsum dolor amet duaron.', 
    created: '5:32pm',
    badges: [
      { class: 'pending', label: 'Pendiente' },
      { class: 'view', label: 'Visto' }
    ],
    active: false
  },
  { 
    ref: 'Boceto 5', 
    title: 'Lorem ipsum dolor sit amet duaron.', 
    created: '2:32pm',
    badges: [
      { class: 'success', label: 'Correcto' },
      { class: 'view', label: 'Visto' }
    ],
    active: false
  },
];

