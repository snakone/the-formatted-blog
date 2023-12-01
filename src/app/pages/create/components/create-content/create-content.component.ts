import { Component, ViewChild, DestroyRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Observable, tap, withLatestFrom } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import Quill from 'quill';
import { DeltaStatic } from 'quill';

import { Post, PostHeader } from '@shared/types/interface.post';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { DRAFT_PUSH } from '@shared/data/notifications';
import { PWAService } from '@core/services/pwa/pwa.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

import { EDIT_POST_CONFIRMATION } from '@shared/data/dialogs';
import { SavingTypeEnum, SavingDraftType } from '@shared/types/types.enums';
import { MESSAGE_KEY, RESIZE_EVENT } from '@shared/data/constants';
import { getQuillHeaders } from '@shared/utils/quill.util.functions';
import { EMPTY_QUILL, HEADER_3_QUILL_ICON, QUILL_MODULES } from '@shared/data/quills';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const Quill_Icons = Quill.import('ui/icons');
const tick = 5000;

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})

export class CreateContentComponent {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  draft!: Post;
  show = false;
  model = EMPTY_QUILL as unknown as DeltaStatic;
  active$: Observable<Post> | undefined;
  isPostTemporal = false;
  quillModules: QuillModules;

  constructor(
    private draftsFacade: DraftsFacade,
    private sw: PWAService,
    private crafter: CrafterService,
    private postFacade: PostsFacade,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit() {
    this.getActive();
    this.addHeader3ToQuill();
  }

  ngAfterContentInit(): void {
    this.getQuillModules();
    this.listenEditor();
  }

  private getQuillModules(): void {
    this.quillModules = QUILL_MODULES(this.editor);
  }

  private getActive(): void {
    this.active$ = this.draftsFacade.active$.pipe(tap(res => this.draft = res));
  }

  private listenEditor(): void {
    this.editor.onContentChanged
     .pipe(
       takeUntilDestroyed(this.destroyRef),
       filter(_ => _.source !== 'api'),
       withLatestFrom(this.draftsFacade.saving$),
       tap(([_, saving]) => !saving?.value ? this.save(true) : null),
       debounceTime(tick),
       distinctUntilChanged(),
       map(([_, sv]) => _.content as any)
     )
     .subscribe((delta: DeltaStatic) => 
     this.onChange(delta, getQuillHeaders(delta.ops)));
  }

  private onChange(
    delta: DeltaStatic,
    headers: PostHeader[]
  ): void {
    !this.draft ? this.createNewDraft(delta, headers) : this.updateDraft(delta, headers);
  }

  private createNewDraft(
    delta: DeltaStatic,
    headers: PostHeader[]
  ): void {
    const draft = { title: 'Boceto ', message: delta, headers };
    this.draftsFacade.create(draft);
    this.save(false);
    // firstValueFrom(this.sw.send(DRAFT_PUSH)).then();
    this.draftsFacade.setPreview(draft);
  }

  private updateDraft(
    delta: DeltaStatic,
    headers: PostHeader[]
  ): void {
    const draft = Object.assign({}, this.draft);
    draft.message = delta;
    draft.headers = headers;

    draft.temporal ? this.showDraftTemportalDialog(draft) : (
      this.save(false),
      this.draftsFacade.updateKey({id: this.draft._id, keys: {key: MESSAGE_KEY, value: delta}})
    );

    this.draftsFacade.setPreview(draft);
  }

  private showDraftTemportalDialog(draft: Post): void {
    this.crafter.confirmation(EDIT_POST_CONFIRMATION)
    .afterClosed()
      .pipe(
        tap(res => !res ? this.save(false, SavingTypeEnum.TEMPORAL) : null),
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(_ => this.save(false))
    ).subscribe(_ => this.postFacade.unPublish(draft));
  }

  private save(
    value: boolean, 
    type: SavingDraftType | 
          SavingTypeEnum.TEMPORAL = SavingTypeEnum.SAVING
  ): void {
    this.draftsFacade.setSaving({type, value})
  }

  public clean(): void {
   this.editor.quillEditor.setContents(null);
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event(RESIZE_EVENT));
  }

  private addHeader3ToQuill(): void {
    Quill_Icons.header[3] = HEADER_3_QUILL_ICON;
  }

  ngOnDestroy() {
    this.draftsFacade.resetPreview();
  }

}

