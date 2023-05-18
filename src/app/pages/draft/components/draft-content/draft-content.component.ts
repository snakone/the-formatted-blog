import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-draft-content',
  templateUrl: './draft-content.component.html',
  styleUrls: ['./draft-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftContentComponent {

  @Input() draft: Post;
  favoritesID$: Observable<string[]> | undefined;

  constructor(private postFacade: PostsFacade) { }

  ngOnInit() {
    this.favoritesID$ = this.postFacade.favoritesID$;
  }

}
