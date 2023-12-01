import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { NOTIFICATION_TEXT } from '@shared/data/sentences';
import { Post } from '@shared/types/interface.post';
import { ActivatedRoute } from '@angular/router';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { SLUG_KEY } from '@shared/data/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent {

  post$: Observable<Post>;
  text = NOTIFICATION_TEXT;

  constructor(
    private postsFacade: PostsFacade,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.post$ = this.postsFacade.bySlug$;
    this.getPostBySlug();
  }

  private getPostBySlug(): void {
    this.route.paramMap
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(res => res?.has(SLUG_KEY)),
      map(res => res.get(SLUG_KEY)),
    ).subscribe((slug: string) => this.postsFacade.getBySlug(slug));
  }

  public notification(): void {
    console.log('home');
  }

}
