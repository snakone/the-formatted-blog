import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CARROUSEL_OPTS } from '@shared/data/data';

@Component({
  selector: 'app-post-carrousel',
  templateUrl: './post-carrousel.component.html',
  styleUrls: ['./post-carrousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class PostCarrouselComponent implements OnInit {

  customOptions = CARROUSEL_OPTS;
  show = false;

  items = [
    '02-img.jpg',
    '03-img.jpg',
    '04-img.jpg',
    '02-img.jpg',
  ];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.show = true, 500);
  }

}
