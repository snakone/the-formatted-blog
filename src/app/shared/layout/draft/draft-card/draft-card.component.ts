import { Component, Input } from '@angular/core';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { SavingType } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { takeUntil, filter, Subject, tap } from 'rxjs';

import { DELETE_CONFIRMATION, PREVIEW_DRAFT_DIALOG } from '@shared/data/dialogs';
import { DraftStatusEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-draft-card',
  templateUrl: './draft-card.component.html',
  styleUrls: ['./draft-card.component.scss']
})

export class DraftCardComponent {

  @Input() draft: Post | undefined;
  @Input() deletedDraftID: string | undefined; // DELETE
  @Input() saving: SavingType | undefined;
  @Input() collapsed = false;
  private unsubscribe$ = new Subject<void>();
  draftStatus = DraftStatusEnum;

  constructor(
    private draftsFacade: DraftsFacade,
    private crafter: CrafterService,
    private createDraftSrv: CreateDraftService
  ) { }

  public activate(draft: Post): void {
    if (this.saving?.value || draft.status === DraftStatusEnum.PENDING) { return; }
    this.draftsFacade.setActive(draft);
  }

  public preview(): void {
    if (!this.draft || this.saving) { return; }
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG);
  }

  public delete(): void {
    if (!this.draft || this.saving) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(Boolean),
        tap(_ => this.createDraftSrv.onDeleteDraft(this.draft._id))
    ).subscribe(_ => this.draftsFacade.delete(this.draft._id));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
