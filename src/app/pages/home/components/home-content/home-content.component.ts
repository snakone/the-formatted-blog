import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { PostsFacade } from '@store/posts/posts.facade';
import { DUMMY_POST } from '@shared/data/data';
import { Post } from '@shared/types/interface.types';

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
