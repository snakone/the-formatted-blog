import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, Subject, Observable } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { CREATE_ACTION_LIST, DELETE_CONFIRMATION, SAVE_CONFIRMATION } from '@shared/data/data';
import { QuillHelpComponent } from '@shared/layout/overlays/quill-help/quill-help.component';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-quill-toolbar',
  templateUrl: './quill-toolbar.component.html',
  styleUrls: ['./quill-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuillToolbarComponent implements OnInit, OnDestroy {

  @Input() draft: Post;
  @Input() form = false;
  saving$: Observable<boolean>;
  private unsubscribe$ = new Subject<void>();
  
  list = CREATE_ACTION_LIST;

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.saving$ = this.draftsFacade.saving$;
  }

  switchObj: any = {
    new: () => this.new(),
    delete: () => this.delete(),
    dialog: () => this.dialog(),
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

  private dialog(): void {
    this.form ? '' :
    this.crafter.dialog(QuillHelpComponent, null, '', 'quill-help');
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
  }

}
