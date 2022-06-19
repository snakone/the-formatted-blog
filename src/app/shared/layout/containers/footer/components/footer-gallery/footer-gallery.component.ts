import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer-gallery',
  templateUrl: './footer-gallery.component.html',
  styleUrls: ['./footer-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterGalleryComponent {

  items = [
    '20-img.jpg',
    '21-img.jpg',
    '22-img.jpg',
    '24-img.jpg',
    '23-img.jpg',
    '19-img.jpg'
  ];

  constructor() { }

}
