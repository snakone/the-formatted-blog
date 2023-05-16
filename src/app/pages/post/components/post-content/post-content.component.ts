import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostContentComponent implements OnInit {

  @Input() post: Post;
  favoritesID$: Observable<string[]> | undefined;

  constructor(private postFacade: PostsFacade) { }

  ngOnInit() {
    this.favoritesID$ = this.postFacade.favoritesID$;
  }

}
