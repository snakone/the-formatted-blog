import { Component, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, firstValueFrom, map, Observable, startWith, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { DeltaOperation } from 'quill';
import { DeltaStatic } from 'quill';
import { EMPTY_QUILL, HEADER_3_QUILL_ICON, QUILL_CONTAINER } from '@shared/data/quills';
import { Post, PostHeader } from '@shared/types/interface.post';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { slugify } from '@core/services/quill/quill.module';
import { DRAFT_PUSH } from '@shared/data/notifications';
import { PWAService } from '@core/services/pwa/pwa.service';
import { NavigationEnd, Router } from '@angular/router';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { EDIT_POST_CONFIRMATION } from '@shared/data/data';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import Quill from 'quill';

const Quill_Icons = Quill.import('ui/icons');

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})

export class CreateContentComponent implements OnDestroy, AfterContentInit {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  draft!: Post;
  private unsubscribe$ = new Subject<void>();
  show = false;
  model = EMPTY_QUILL as unknown as DeltaStatic;
  timer = 5000;
  active$: Observable<Post> | undefined;
  isPostTemporal = false;

  quillModules: QuillModules = {
    syntax: true,
    toolbar: {
      container: QUILL_CONTAINER,
      handlers: {
        'undo': () => this.editor.quillEditor.getModule('history').undo(),
        'redo': () => this.editor.quillEditor.getModule('history').redo(),
      }
    },
    imageCompress: {
      quality: 0.5,
      maxWidth: 600, 
      maxHeight: 350, 
      debug: false, 
    },
    history: { delay: 2000, userOnly: false },
  };

  constructor(
    private draftsFacade: DraftsFacade,
    private sw: PWAService,
    private router: Router,
    private crafter: CrafterService,
    private postFacade: PostsFacade
  ) { }

  ngOnInit() {
    this.getActive();
    this.addHeader3ToQuill();
  }

  ngAfterContentInit(): void {
    this.listenEditor();
  }

  private getActive(): void {
    this.active$ = this.draftsFacade.active$.pipe(tap(res => this.draft = res));
  }

  private listenEditor(): void {
    this.editor.onContentChanged
     .pipe(
       takeUntil(this.unsubscribe$),
       filter(_ => _.source !== 'api'),
       distinctUntilChanged(),
       withLatestFrom(this.draftsFacade.saving$),
       tap(([_, saving]) => !saving?.value ? this.save(true) : null),
       debounceTime(this.timer),
       map(([_, sv]) => _.content as any)
     )
     .subscribe((delta) => 
        this.onChange(delta, this.getHeaders(delta.ops))
      );
  }

  private getHeaders(ops: DeltaOperation[]): PostHeader[] {
    if (ops) {
      const headers = ops.map(
        (o: DeltaOperation, i) => {
          if (o.attributes?.header === 2) {
            const str: string = ops[i - 1] && ops[i - 1].insert?.split('\n');
            const text =  str[str.length - 1];
            return {text, id: slugify(text)} as PostHeader;
          }

          return null;
        }
      ).filter(s => Boolean(s));
      return headers;
    }
    return [];
  }

  private onChange(
    delta: DeltaStatic,
    headers: PostHeader[]
  ): void {
    let temporalDraft: Post | undefined;

    // CREATE
    if (!this.draft) {
      temporalDraft = { title: 'Boceto ', message: delta, headers };
      this.draftsFacade.create(temporalDraft);
      this.save(false);
      // firstValueFrom(this.sw.send(DRAFT_PUSH)).then();
    } else {
      temporalDraft = Object.assign({}, this.draft);
      temporalDraft.message = delta;
      temporalDraft.headers = headers;

      // TEMPORAL - UNPUBLISH
      if (this.draft.temporal) {
        this.crafter.confirmation(EDIT_POST_CONFIRMATION)
        .afterClosed()
          .pipe(
            tap(res => !res ? this.save(false, 'temporal') : null),
            takeUntil(this.unsubscribe$),
            filter(_ => _ && !!_)
        ).subscribe(_ => (this.save(false), this.postFacade.unPublish(temporalDraft)));
      } else { // UPDATE
        this.draftsFacade.update(temporalDraft);
        this.save(false);
      }
    }

    this.draftsFacade.setPreview(temporalDraft);
  }

  private save(value: boolean, type: 'saving' | 'warning' | 'temporal' = 'saving'): void {
    this.draftsFacade.setSaving({type, value})
  }

  public clean(): void {
   this.editor.quillEditor.setContents(null);
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

  private addHeader3ToQuill(): void {
    Quill_Icons.header[3] = HEADER_3_QUILL_ICON;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.draftsFacade.resetPreview();
  }

}
