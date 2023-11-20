import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NewsFacade } from '@core/ngrx/news/news.facade';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';
import { FormattedNew } from '@shared/types/interface.types';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})

export class NewsComponent implements OnInit {

  text = NOTIFICATION_TEXT;
  duration = 1500;
  news$: Observable<FormattedNew[]> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(private newsFacade: NewsFacade) { }

  ngOnInit(): void { 
    this.checkData();
    this.news$ = this.newsFacade.news$;
  }

  private checkData(): void {
    this.newsFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.newsFacade.get());
  }

  public notification(): void {
    console.log('home');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
