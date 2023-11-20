import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, Subject, Observable, map } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { CREATE_ACTION_LIST, DELETE_CONFIRMATION, SAVE_CONFIRMATION } from '@shared/data/data';
import { QuillHelpComponent } from '@shared/layout/overlays/quill-help/quill-help.component';
import { Post } from '@shared/types/interface.post';
import { DraftPreviewDialogComponent } from '@shared/layout/overlays/draft-preview/draft-preview.component';
import { QuillService } from '@core/services/quill/quill.service';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { SavingType } from '@shared/types/interface.app';

@Component({
  selector: 'app-quill-toolbar',
  templateUrl: './quill-toolbar.component.html',
  styleUrls: ['./quill-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuillToolbarComponent implements OnInit, OnDestroy {

  @Input() draft: Post;
  @Input() form = false;
  @Output() clean = new EventEmitter<void>();
  saving$: Observable<SavingType>;
  private unsubscribe$ = new Subject<void>();
  total$: Observable<number> | undefined;
  
  list = CREATE_ACTION_LIST;

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade,
    private router: Router,
    private route: ActivatedRoute,
    private quillSrv: QuillService,
    private createDraftSrv: CreateDraftService
  ) { }

  ngOnInit(): void {
    this.saving$ = this.draftsFacade.saving$;
    this.total$ = this.draftsFacade.drafts$.pipe(
      map(drafts => drafts?.length || 0)
    );
  }

  switchObj: any = {
    new: (sv: boolean) => this.new(sv),
    preview: (sv: boolean) => this.preview(sv),
    clean: (sv: boolean) => {if (!sv) this.clean.emit()},
    delete: (sv: boolean) => this.delete(sv),
    download: (sv: boolean) => this.download(sv),
    help: (sv: boolean) => this.help(sv),
    next: () => this.next()
  };

  private new(sv: boolean): void {
    if (!this.draft || sv || this.draft.temporal) { return; }
    this.crafter.confirmation(SAVE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => {
        this.draftsFacade.updateKey(
          this.draft._id, { key: 'message', value: this.draft.message }
        );
        this.draftsFacade.resetActive();
    });
  }

  private preview(sv: boolean): void {
    if (!this.draft || sv) { return; }
    this.crafter.dialog(DraftPreviewDialogComponent, null, undefined, 'preview');
  }

  private help(sv: boolean): void {
    if (sv) { return; }
    this.form ? null :
    this.crafter.dialog(QuillHelpComponent, null, '', 'quill-help');
  }

  private download(sv: boolean): void {
    if (!this.draft || sv) { return; }
    this.quillSrv.convertToHTML(this.draft);
  }

  private delete(sv: boolean): void {
    if (!this.draft || sv) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => (
        this.draftsFacade.delete(this.draft._id),
        this.createDraftSrv.onDeleteDraft(this.draft._id)
    ));
  }

  private next(): void {
    if (!this.draft) { return; }
    this.router.navigate(['form'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.draftsFacade.resetSaving();
  }

}
