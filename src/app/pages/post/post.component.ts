import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, filter, map, switchMap, takeUntil } from 'rxjs';

import { NOTIFICATION_TEXT } from '@shared/data/sentences';
import { Post } from '@shared/types/interface.types';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent implements OnInit {

  post$: Observable<Post>;
  text = NOTIFICATION_TEXT;
  private unsubscribe$ = new Subject<void>();

  constructor(private postsFacade: PostsFacade, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.post$ = this.postsFacade.bySlug$;
    this.getPostBySlug();
  }

  private getPostBySlug(): void {
    this.route.paramMap
    .pipe(
      takeUntil(this.unsubscribe$),
      filter(res => !!res && !!res.get('slug')),
      map(res => res.get('slug')),
    ).subscribe((slug: string) => this.postsFacade.getBySlug(slug));
  }

  public notification(): void {
    console.log('home');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
