import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, Subject, Observable } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { CREATE_ACTION_LIST, DELETE_CONFIRMATION, SAVE_CONFIRMATION } from '@shared/data/data';
import { QuillHelpComponent } from '@shared/layout/overlays/quill-help/quill-help.component';
import { Post, SavingType } from '@shared/types/interface.types';
import { DraftPreviewComponent } from '@shared/layout/overlays/draft-preview/draft-preview.component';
import { QuillService } from '@core/services/quill/quill.service';

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
  
  list = CREATE_ACTION_LIST;

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade,
    private router: Router,
    private route: ActivatedRoute,
    private quillSrv: QuillService
  ) { }

  ngOnInit(): void {
    this.saving$ = this.draftsFacade.saving$;
  }

  switchObj: any = {
    new: () => this.new(),
    preview: () => this.preview(),
    clean: () => this.clean.emit(),
    delete: () => this.delete(),
    download: () => this.download(),
    help: () => this.help(),
    next: () => this.next()
  };

  private new(): void {
    if (!this.draft) { return; }
    this.crafter.confirmation(SAVE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => {
        this.draftsFacade.updateKey(
          this.draft._id, { key: 'message', value: this.draft.message }
        );
        this.draftsFacade.activeOff();
        this.router.navigateByUrl('/create');
    });
  }

  private preview(): void {
    if (!this.draft) { return; }
    this.crafter.dialog(DraftPreviewComponent, null, undefined, 'preview');
  }

  private help(): void {
    this.form ? '' :
    this.crafter.dialog(QuillHelpComponent, null, '', 'quill-help');
  }

  private download(): void {
    if (!this.draft) { return; }
    this.quillSrv.convertToHTML(this.draft);
  }

  private delete(): void {
    if (!this.draft) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => (
        this.draftsFacade.delete(this.draft._id),
        this.router.navigateByUrl('/create')
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
