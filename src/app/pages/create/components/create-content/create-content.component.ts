import { Component, ChangeDetectionStrategy, ViewChild, OnDestroy, Input, AfterContentInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, tap } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { Delta } from 'quill';

import { CrafterService } from '@services/crafter/crafter.service';
import { CREATE_ACTION_LIST } from '@shared/data/data';
import { EMPTY_QUILL } from '@shared/data/quills';
import { QuillHelpComponent } from '@layout/overlays/quill-help/quill-help.component';
import { Post } from '@shared/types/interface.types';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateContentComponent implements OnDestroy, AfterContentInit {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  @Input() draft: Post;
  
  saving$ = new BehaviorSubject<boolean>(false);
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
      container: [
        ['bold'],
        ['blockquote', 'code-block'],
        [{ 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['undo' , 'redo'],
        ['link', 'image', 'video'],
      ],
      handlers: {
        'undo': () => this.editor.quillEditor.getModule('history').undo(),
        'redo': () => this.editor.quillEditor.getModule('history').redo(),
      }
    },
    history: {
      delay: 2000,
      userOnly: true
    },
  };

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade
  ) { }

  ngAfterContentInit(): void {
    this.editor.onContentChanged
     .pipe(
       filter(_ => _.source !== 'api'),
       tap(_ => this.saving$.next(true)),
       debounceTime(5000),
       distinctUntilChanged(),
       map(_ => _.content as Delta),
       takeUntil(this.unsubscribe$)
     )
     .subscribe((message: Delta) => this.onChange(message));
  }

  private onChange(message: Delta): void {
    !this.draft ? // NEW 
      (
        this.draft = { title: 'Boceto ', message },
        this.draftsFacade.create(this.draft)
      ) :  // UPDATE
    this.draftsFacade.updateKey(this.draft._id, {key: 'message', value: message});
    this.saving$.next(false);
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

  public action(v: string): void {
    this.switchObj[v]();
  }

  private new(): void {
    if (!this.draft) { return; }

    const ref = this.crafter.confirmation(
      'Nuevo...', '¿Quieres guardar el boceto actual y crear uno nuevo?'
    );

    ref.afterClosed()
    .pipe(
     takeUntil(this.unsubscribe$),
     filter(_ => _ && !!_)
   ).subscribe(_ => {
      this.draftsFacade.updateKey(this.draft._id, {key: 'message', value: this.draft.message});
      this.draftsFacade.activeOff();
   });
  }

  private openHelp(): void {
    this.crafter.dialog(QuillHelpComponent, null, '', 'quill-help');
  }

  private delete(): void {
    if (!this.draft) { return; }
    const ref = this.crafter.confirmation(
      'Eliminar...', '¿Estás seguro que quieres eliminar este boceto?'
    );

    ref.afterClosed()
     .pipe(
      takeUntil(this.unsubscribe$),
      filter(_ => _ && !!_)
    ).subscribe(_ => this.draftsFacade.delete(this.draft._id));
  }

  private next(): void {
    console.log('next');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
