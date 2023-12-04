import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SEARCH_RESULT_AMOUNT_LIST } from '@shared/data/data';
import { SearchResultAmount } from '@shared/types/interface.post';
import { SearchResult } from '@shared/types/interface.user';

@Component({
  selector: 'app-searh-sidebar',
  templateUrl: './searh-sidebar.component.html',
  styleUrl: './searh-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearhSidebarComponent {

  @Input() result: SearchResult;
  @Input() value: string = '';

  public createResultList(): SearchResultAmount[] {
    return SEARCH_RESULT_AMOUNT_LIST(this.result);
  }

  public emptyResult(result: SearchResult): boolean {
    const noPosts = result.posts.length === 0;
    const noDrafts = result.drafts.length === 0;
    const noUsers = result.users.length === 0;
    const noFriends = result.friends.length === 0;
  
    return noPosts && noDrafts && noUsers && noFriends;
  }

}
