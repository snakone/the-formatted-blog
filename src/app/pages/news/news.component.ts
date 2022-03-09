import { Component, OnInit } from '@angular/core';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  text = NOTIFICATION_TEXT;
  duration = 2000;

  constructor() { }

  ngOnInit(): void { }

  public notification(): void {
    console.log('home');
  }

}
