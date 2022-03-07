import { Post } from '@shared/types/interface.types';
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
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Home & Living',
    author: 'Elisa Park',
    date: 'Sep, 10 2019',
    image: '05-img.jpg',
    message: POST_MESSAGE_ALONE
  },
  {
    _id: '2',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Amazing Food',
    author: 'Marisa Hudson',
    date: 'Jun, 26 2019',
    image: '05-img.jpg',
    message: POST_MESSAGE
  },
  {
    _id: '3',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Lifestyle',
    author: 'Jhone Albert',
    date: 'Sep, 17 2015',
    image: '05-img.jpg',
    message: POST_MESSAGE
  },
  {
    _id: '4',
    title: 'Sed quis sollicitudin eros, non lobortis purus.',
    category: 'Travel',
    author: 'Albert Jhone',
    date: 'Dec, 10 2016',
    image: '05-img.jpg',
    message: POST_MESSAGE_ALONE
  },
  {
    _id: '5',
    title: 'LOREM IPSUM, DOLOR SIT AMET CONSECTETUR ADIPISICING ELIT OUSL BAK.',
    category: 'Miscellenious',
    author: 'Alfred Hannog',
    date: 'Jan, 05 2016',
    image: '05-img.jpg',
    message: POST_MESSAGE
  }
];
