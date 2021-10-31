import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  loaded = false;

  constructor() { }

  ngOnInit(): void { }

  public goTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
