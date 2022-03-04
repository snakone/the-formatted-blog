import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NOTIFICATION_TOOLTIP } from '@shared/data/sentences';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  loaded = false;
  tooltip = NOTIFICATION_TOOLTIP;

  constructor() { }

  ngOnInit(): void { }

  public goTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  public notification(): void {
    console.log('home');
  }

}
