import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewsFacade } from '@core/ngrx/news/news.facade';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';
import { FormattedNew } from '@shared/types/interface.app';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})

export class NewsComponent {

  text = NOTIFICATION_TEXT;
  duration = 1500;
  news$: Observable<FormattedNew[]> | undefined;

  constructor(private newsFacade: NewsFacade, private destroyRef: DestroyRef) { }

  ngOnInit(): void { 
    this.checkData();
    this.news$ = this.newsFacade.news$;
  }

  private checkData(): void {
    this.newsFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntilDestroyed(this.destroyRef)
      )
     .subscribe(_ => this.newsFacade.get());
  }

  public notification(): void {
    console.log('home');
  }

}
