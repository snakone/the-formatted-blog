import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoryBoxComponent implements OnInit {

  categories = [
    { name: 'Awesome Travelling', amount: 598 },
    { name: 'Daily Life Routeen', amount: 1058 },
    { name: 'Amazing Food', amount: 42 },
    { name: 'Fashion', amount: 158 },
    { name: 'Lifestyle', amount: 4058 },
    { name: 'Politics', amount: 958 },
    { name: 'Miscellenious', amount: 9852 },
    { name: 'Games', amount: 452 },
    { name: 'Video Streaming', amount: 89 },
  ];

  constructor() { }

  ngOnInit(): void { }

}
