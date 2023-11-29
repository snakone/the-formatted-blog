import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { StatusButtons } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';
import { Subject, map, takeUntil } from 'rxjs';

import { RESIZE_EVENT } from '@shared/data/constants';
import { DraftStatusEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminContentComponent implements OnInit {

  drafts: Post[] | undefined;
  filteredDrafts: Post[];
  private unsubscribe$ = new Subject<void>();

  status: StatusButtons[] = [
    {status: DraftStatusEnum.NOT_SEEN, active: false},
    {status: DraftStatusEnum.SEEN, active: false}, 
    {status: DraftStatusEnum.PENDING, active: false},
    {status: DraftStatusEnum.ALL, active: false}
  ];

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.draftsFacade.all$.pipe(
      takeUntil(this.unsubscribe$),
      map(drafts => drafts?.filter(d => d.status !== DraftStatusEnum.APPROVED))
    ).subscribe(res => {
      this.drafts = res;
      this.filteredDrafts = res;
    });
  }

  public sort(value: StatusButtons): void {
    this.status.forEach(s => s.active = false);
    value.active = true;
    
    if (value.status === DraftStatusEnum.ALL) {
      this.filteredDrafts = this.drafts;
      window.dispatchEvent(new Event(RESIZE_EVENT));
      return;
    }
    this.filteredDrafts = this.drafts
    .filter((draft: Post) => draft.status === value.status);

    window.dispatchEvent(new Event(RESIZE_EVENT));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}


