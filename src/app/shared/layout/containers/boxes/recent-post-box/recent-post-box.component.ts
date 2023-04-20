import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-recent-post-box',
  templateUrl: './recent-post-box.component.html',
  styleUrls: ['./recent-post-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecentPostBoxComponent {

  items = [
    '06-img.jpg',
    '07-img.jpg',
    '08-img.jpg',
    '09-img.jpg',
    '12-img.jpg',
    '13-img.jpg',
  ];

  constructor() { }

}
