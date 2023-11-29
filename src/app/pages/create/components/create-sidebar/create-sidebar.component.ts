import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { SavingType } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';
import { Observable, distinctUntilKeyChanged, filter } from 'rxjs';

import { DraftStatusEnum } from '@shared/types/types.enums';
import { RESIZE_EVENT, VALUE_KEY } from '@shared/data/constants';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class CreateSidebarComponent implements OnInit {

  @Input() drafts!: Post[] | null;
  @Input() originalCollapsed: boolean;
  deletedID$: Observable<string> | undefined;
  saving$: Observable<SavingType> | undefined;
  collaped = false;

  constructor(
    private createDraftService: CreateDraftService,
    private draftsFacade: DraftsFacade,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.checkCollapseResize();
    this.deletedID$ = this.createDraftService.onDraftDelete$;
    this.saving$ = this.draftsFacade.saving$.pipe(
      filter(Boolean), 
      distinctUntilKeyChanged(VALUE_KEY)
    ); 
  }

  ngAfterViewInit() {
    this.setActiveIfDraftAlone();
  }

  private setActiveIfDraftAlone(): void {
    const firstDraft = this.drafts[0];

    if (
      this.drafts && 
      this.drafts.length === 1 && 
      firstDraft.status !== DraftStatusEnum.PENDING
    ) {
      this.draftsFacade.setActive(firstDraft);
    }
  }

  public collapseSidebar(): void { 
    this.collaped = !this.collaped;
    this.createDraftService.onCollapse(this.collaped);
  }

  private checkCollapseResize(): void {
    window.addEventListener(RESIZE_EVENT, () => {
      document.body.clientWidth < 984 ? 
        this.collaped = false : this.collaped = this.originalCollapsed;
      this.changeRef.detectChanges();
    })
  }

}
