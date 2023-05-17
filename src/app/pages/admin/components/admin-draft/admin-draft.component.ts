import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PWAService } from '@core/services/pwa/pwa.service';
import { CHECKSTATUS, PUBLISH_CONFIRMATION } from '@shared/data/data';
import { PUBLISH_PUSH } from '@shared/data/notifications';
import { ADMIN_DRAFT_MESSAGE_DESC, BAD_COVER_CAUSE, BAD_COVER_SIZE, UNKWON_ERROR_SENTENCE } from '@shared/data/sentences';
import { DraftPreviewComponent } from '@shared/layout/overlays/draft-preview/draft-preview.component';
import { DraftCheck, Post } from '@shared/types/interface.types';
import { Subject, takeUntil, switchMap, filter, firstValueFrom } from 'rxjs';

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
  maxImageSize = 150;

  constructor(
    private draftsFacade: DraftsFacade,
    private route: ActivatedRoute,
    private crafter: CrafterService,
    private router: Router,
    private sw: PWAService
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

    // Publish DRAFT
    if (ok) {
      this.crafter.confirmation(PUBLISH_CONFIRMATION)
       .afterClosed()
        .pipe(
          takeUntil(this.unsubscribe$),
          filter(_ => !!_)
      ).subscribe(_ => {
        this.draftsFacade.publish(this.draft);

        firstValueFrom(this.sw.send(
          this.sw.set(Object.assign({}, PUBLISH_PUSH), this.draft)
        )).then(_ => this.navigate());
      });
    } // UPDATE DRAFT
    else {
      this.draftsFacade.updateKey(this.draft?._id, {key: 'check', value: this.draft.check}, true);

      if (this.markAsPending) {
        this.draftsFacade.updateKey(
          this.draft?._id, {key: 'status', value: 'pending'}
        )
      }

      this.navigate();
    }
  }

  private checkCover(draft: Post): void {
    this.markAsPending = this.draft.status === 'pending';
    
    try {
      this.sendRequest(draft.cover || '', (sizeInBytes) => {
        this.coverSize = (sizeInBytes / 1024).toFixed(2);
        
        if (Number(this.coverSize) > this.maxImageSize) {
          this.draft.check.hasGoodCover.ok = false;
          this.draft.check.hasGoodCover.cause = BAD_COVER_SIZE
        }
  
        if (isNaN(sizeInBytes)) {
          this.coverSize = '0';
          this.draft.check.hasGoodCover.ok = false;
          this.draft.check.hasGoodCover.cause = BAD_COVER_CAUSE;
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

  private navigate(): void {
    this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true, fragment: 'reload'});
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
