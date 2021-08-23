import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-social-box',
  templateUrl: './social-box.component.html',
  styleUrls: ['./social-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SocialBoxComponent implements OnInit {

  items = [
    '10-img.jpg',
    '11-img.jpg',
    '12-img.jpg',
    '13-img.jpg',
    '14-img.jpg',
    '15-img.jpg',
    '16-img.jpg',
    '17-img.jpg',
    '18-img.jpg'
  ];

  constructor() { }

  ngOnInit(): void { }

}
