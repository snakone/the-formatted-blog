import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { PostsFacade } from '@store/posts/posts.facade';
import { Post } from '@shared/types/interface.post';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeContentComponent {

  posts$!: Observable<Post[]>;
  favoritesID$: Observable<string[]> | undefined;
  
  constructor(private postFacade: PostsFacade, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.checkData();
    this.posts$ = this.postFacade.posts$;
    this.favoritesID$ = this.postFacade.favoritesID$;
  }

  private checkData(): void {
    this.postFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntilDestroyed(this.destroyRef)
      )
     .subscribe(_ => this.postFacade.get());
  }

}
