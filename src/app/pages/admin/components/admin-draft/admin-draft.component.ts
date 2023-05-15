import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { CHECKSTATUS } from '@shared/data/data';
import { ADMIN_DRAFT_MESSAGE_DESC, UNKWON_ERROR_SENTENCE } from '@shared/data/sentences';
import { DraftPreviewComponent } from '@shared/layout/overlays/draft-preview/draft-preview.component';
import { DraftCheck, Post } from '@shared/types/interface.types';
import { Subject, takeUntil, switchMap, filter } from 'rxjs';

@Component({
  selector: 'app-admin-draft',
  templateUrl: './admin-draft.component.html',
  styleUrls: ['./admin-draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminDraftComponent {

  draft: Post | undefined;
  private unsubscribe$ = new Subject<void>();
  checkStatus = CHECKSTATUS;
  public coverSize: string;
  adminDraftMessageDesc = ADMIN_DRAFT_MESSAGE_DESC;
  eveythingOK: boolean;
  markAsPending = false;

  constructor(
    private draftsFacade: DraftsFacade,
    private route: ActivatedRoute,
    private crafter: CrafterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDraftByID();
  }

  private getDraftByID(): void {
    this.route.paramMap
    .pipe(
      takeUntil(this.unsubscribe$),
      switchMap((res: ParamMap) => this.draftsFacade.byID$(res.get('id'))
      )
    ).pipe(filter(res => !!res))
    .subscribe((res: Post) => (this.draft = res, this.checkCover(res)));
  }

  public preview(): void {
    if (!this.draft) { return; }
    this.draftsFacade.setPreview(this.draft);

    this.crafter.dialog(DraftPreviewComponent, {
      updateStatus: true,
      draft: this.draft
    }, undefined, 'preview');
  }

  public publish(): void {
    const ok = this.isEverythingOK(this.draft.check);
    Object.values(this.draft.check).forEach(c => {
      if (c.ok) {
        c.cause = null;
      }
    });

    if (ok) {
      // Publish DRAFT
      console.log(this.draft, 'all OK')
    } else {
      // Update draft check
      this.draftsFacade.updateKey(this.draft?._id, {key: 'check', value: this.draft.check}, true);

      if (this.markAsPending) {
        this.draftsFacade.updateKey(
          this.draft?._id, {key: 'status', value: 'pending'}
        )
      }

      this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true, fragment: 'reload'});
    }
  }

  private checkCover(draft: Post): void {
    this.markAsPending = this.draft.status === 'pending';
    
    try {
      this.sendRequest(draft.cover || '', (sizeInBytes) => {
        this.coverSize = (sizeInBytes / 1024).toFixed(2);
        
        if (Number(this.coverSize) > 100) {
          this.draft.check.hasGoodCover.ok = false;
        }
  
        if (isNaN(sizeInBytes)) {
          this.coverSize = '0';
          this.draft.check.hasGoodCover.ok = false;
        }
      });
    } catch (err) {
      console.log(err);
      this.crafter.setSnack(UNKWON_ERROR_SENTENCE, 'error')
    }
  }

  private sendRequest(cover: string, callback: (size: number) => void) {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', cover, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        if (callback) {
          const size = parseInt(xhr.getResponseHeader('Content-Length')!, 10);
          callback(size);
        }
      }
    };
    xhr.send();
  }

  public isEverythingOK(value: DraftCheck): boolean {
    return Object.values(value).every(i => i.ok)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
