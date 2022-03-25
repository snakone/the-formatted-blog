import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.types';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeContentComponent implements OnInit {

  posts$!: Observable<Post[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private postFacade: PostsFacade) { }

  ngOnInit(): void {
    this.checkData();
    this.posts$ = this.postFacade.posts$;
  }

  private checkData(): void {
    this.postFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.postFacade.get());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
