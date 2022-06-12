import { Component, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, tap } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { Delta } from 'quill';

import { CrafterService } from '@services/crafter/crafter.service';
import { CREATE_ACTION_LIST, DELETE_CONFIRMATION, SAVE_CONFIRMATION } from '@shared/data/data';
import { EMPTY_QUILL, QUILL_CONTAINER } from '@shared/data/quills';
import { QuillHelpComponent } from '@layout/overlays/quill-help/quill-help.component';
import { Post } from '@shared/types/interface.types';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})

export class CreateContentComponent implements OnDestroy, AfterContentInit {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  draft: Post;
  
  saving = false;
  private unsubscribe$ = new Subject<void>();
  list = CREATE_ACTION_LIST;
  show = false;

  model = EMPTY_QUILL as Delta;

  switchObj: any = {
    new: () => this.new(),
    delete: () => this.delete(),
    help: () => this.openHelp(),
    next: () => this.next()
  };

  quillModules: QuillModules = {
    syntax: true,
    toolbar: {
      container: QUILL_CONTAINER,
      handlers: {
        'undo': () => this.editor.quillEditor.getModule('history').undo(),
        'redo': () => this.editor.quillEditor.getModule('history').redo(),
      }
    },
    history: { delay: 2000, userOnly: true },
  };

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngAfterContentInit(): void {
    this.listenEditor();
    this.getActive();
  }

  private listenEditor(): void {
    this.editor.onContentChanged
     .pipe(
       takeUntil(this.unsubscribe$),
       filter(_ => _.source !== 'api'),
       distinctUntilChanged(),
       tap(_ => this.saving = true),
       debounceTime(5000),
       tap(_ => this.saving = false),
       map(_ => _.content as Delta)
     )
     .subscribe((message: Delta) => this.onChange(message));
  }

  private getActive(): void {
    this.draftsFacade.active$
    .pipe(takeUntil(this.unsubscribe$))
     .subscribe(res => this.draft = res);
  }

  private onChange(message: Delta): void {
    !this.draft ? // NEW 
      (
        this.draft = { title: 'Boceto ', message },
        this.draftsFacade.create(this.draft)
      ) :  // UPDATE
    this.draftsFacade.updateKey(
      this.draft._id, { key: 'message', value: message }
    );
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

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
    });
  }

  private openHelp(): void {
    this.crafter.dialog(QuillHelpComponent, null, '', 'quill-help');
  }

  private delete(): void {
    if (!this.draft) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => this.draftsFacade.delete(this.draft._id));
  }

  private next(): void {
    this.router.navigate(['form'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
