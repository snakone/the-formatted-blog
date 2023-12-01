import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, DestroyRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, Observable, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { Post } from '@shared/types/interface.post';
import { QuillService } from '@core/services/quill/quill.service';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { SavingType } from '@shared/types/interface.app';

import { MESSAGE_KEY } from '@shared/data/constants';
import { SavingTypeEnum } from '@shared/types/types.enums';
import { CREATE_ACTION_LIST } from '@shared/data/data';

import { 
  SAVE_CONFIRMATION, 
  DELETE_CONFIRMATION, 
  PREVIEW_DRAFT_DIALOG, 
  QUILL_HELP_DIALOG 
} from '@shared/data/dialogs';

@Component({
  selector: 'app-quill-toolbar',
  templateUrl: './quill-toolbar.component.html',
  styleUrls: ['./quill-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuillToolbarComponent {

  @Input() draft: Post;
  @Input() form = false;
  @Output() clean = new EventEmitter<void>();
  saving$: Observable<SavingType>;
  totalDrafts$: Observable<number> | undefined;
  saveTypes = SavingTypeEnum;
  
  iconList = CREATE_ACTION_LIST;

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade,
    private router: Router,
    private route: ActivatedRoute,
    private quillSrv: QuillService,
    private createDraftSrv: CreateDraftService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.saving$ = this.draftsFacade.saving$;
    this.totalDrafts$ = this.draftsFacade.drafts$.pipe(
      map(drafts => drafts?.length || 0)
    );
  }

  switchAction: {[key: string]: (saving?: boolean) => void} = {
    new: (saving: boolean) => this.new(saving),
    preview: (saving: boolean) => this.preview(saving),
    clean: (saving: boolean) => {if (!saving) this.clean.emit()},
    delete: (saving: boolean) => this.delete(saving),
    download: (saving: boolean) => this.download(saving),
    help: (saving: boolean) => this.help(saving),
    form: () => this.goToForm()
  };

  private new(saving: boolean): void {
    if (!this.draft || saving || this.draft.temporal) { return; }
    this.crafter.confirmation(SAVE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(_ => this.draftsFacade.updateKey(
          {id: this.draft._id, keys: { key: MESSAGE_KEY, value: this.draft.message }}
        ))
    ).subscribe(_ => this.draftsFacade.resetActive());
  }

  private preview(saving: boolean): void {
    if (!this.draft || saving) { return; }
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG);
  }

  private help(saving: boolean): void {
    if (saving) { return; }
    this.crafter.dialog(QUILL_HELP_DIALOG);
  }

  private download(saving: boolean): void {
    if (!this.draft || saving) { return; }
    this.quillSrv.convertToHTML(this.draft);
  }

  private delete(saving: boolean): void {
    if (!this.draft || saving) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(_ => this.createDraftSrv.onDeleteDraft(this.draft._id))
    ).subscribe(_ => this.draftsFacade.delete(this.draft._id));
  }

  private goToForm(): void {
    if (!this.draft) { return; }
    this.router.navigate(['form'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.draftsFacade.resetSaving();
  }

}
