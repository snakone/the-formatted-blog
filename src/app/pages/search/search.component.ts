import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { SearchFacade } from '@core/ngrx/search/search.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';
import { SearchResult } from '@shared/types/interface.user';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent {

  result$: Observable<SearchResult>;
  value$: Observable<string>;
  favoritesID$: Observable<string[]>;

  text = NOTIFICATION_TEXT;

  constructor(private searchFacade: SearchFacade, private postFacade: PostsFacade) {}

  ngOnInit() {
    this.result$ = this.searchFacade.result$;
    this.value$ = this.searchFacade.value$;
    this.favoritesID$ = this.postFacade.favoritesID$;
  }

  public notification(): void {
    console.log('home');
  }

  ngOnDestroy() {
    this.searchFacade.reset();
  }

}
