import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CARROUSEL_OPTS } from '@shared/data/data';

@Component({
  selector: 'app-post-carrousel',
  templateUrl: './post-carrousel.component.html',
  styleUrls: ['./post-carrousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCarrouselComponent implements OnInit {

  @Input() profile = false;

  customOptions = CARROUSEL_OPTS;

  items = [
    '02-img.jpg',
    '03-img.jpg',
    '04-img.jpg',
    '02-img.jpg',
  ];


  constructor() { }

  ngOnInit(): void { }

}
