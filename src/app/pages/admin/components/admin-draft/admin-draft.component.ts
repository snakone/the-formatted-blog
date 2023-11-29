import { ChangeDetectionStrategy, Component, Signal, computed } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PWAService } from '@core/services/pwa/pwa.service';
import { Subject, takeUntil, switchMap, filter, firstValueFrom, throttleTime, tap, retry, debounceTime } from 'rxjs';

import { Post } from '@shared/types/interface.post';
import { DraftCheck } from '@shared/types/interface.server';

import { PUBLISH_CONFIRMATION, DELETE_CONFIRMATION, PREVIEW_DRAFT_DIALOG_UPDATE } from '@shared/data/dialogs';
import { PUBLISH_PUSH } from '@shared/data/notifications';
import { CHECKSTATUS } from '@shared/data/data';
import { ADMIN_DRAFT_MESSAGE_DESC, BAD_COVER_CAUSE, BAD_COVER_SIZE, UNKWON_ERROR_SENTENCE } from '@shared/data/sentences';
import { CHECK_KEY, ID_KEY, STATUS_KEY } from '@shared/data/constants';
import { DraftStatusEnum, SnackTypeEnum } from '@shared/types/types.enums';

const maxImageSize = 150;

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
  public coverSize: number;
  adminDraftMessageDesc = ADMIN_DRAFT_MESSAGE_DESC;
  eveythingOK: boolean;
  markAsPending: boolean;

  xhr: XMLHttpRequest = new XMLHttpRequest();;

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
      switchMap((res: ParamMap) => this.draftsFacade.byID$(res.get(ID_KEY))),
      throttleTime(100),
      tap(res => !res ? this.draftsFacade.getAll() : null),
      retry(1)
    ).pipe(
      filter(Boolean),
      tap((res: Post) => this.markAsPending = res.status === DraftStatusEnum.PENDING)
    )
    .subscribe((res: Post) => (this.draft = res, this.checkCover(res)));
  }

  public preview(): void {
    if (!this.draft) { return; }
    this.draftsFacade.setPreview(this.draft);
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG_UPDATE(this.draft));
  }

  public publish(): void {
    const allChecksPassed = this.allDraftChecksOK(this.draft.check);
    this.clearCausesForPassedChecks(this.draft.check);

    if (allChecksPassed) {
      this.showPublishConfirmation();
    }
    else {
      this.updateDraftAndStatus();
      setTimeout(() => this.navigate(), 1000);
    }
  }

  private clearCausesForPassedChecks(checks: DraftCheck): void {
    Object.values(checks).forEach(c => {
      if (c.ok) {
        c.cause = null;
      }
    });
  }

  private showPublishConfirmation(): void {
    this.crafter.confirmation(PUBLISH_CONFIRMATION)
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(Boolean),
        tap(_ => this.draftsFacade.publish(this.draft))
      ).subscribe(_ => firstValueFrom(
        this.sw.send(this.sw.set(Object.assign({}, PUBLISH_PUSH), this.draft))
      ).then(_ => this.navigate()));
  }

  private updateDraftAndStatus(): void {
    this.draftsFacade.updateKey(this.draft?._id, { key: CHECK_KEY, value: this.draft.check }, true);
  
    if (this.markAsPending) {
      this.draftsFacade.updateKey(
        this.draft?._id, { key: STATUS_KEY, value: DraftStatusEnum.PENDING }, true
      );
    }
  }

  private async checkCover(draft: Post): Promise<void> {
    try {
      const sizeInBytes = await this.sendRequest(draft.cover || '');
      this.coverSize = Number((sizeInBytes / 1024).toFixed(2));

      if (Number(this.coverSize) > maxImageSize) {
        this.handleBadCover(BAD_COVER_SIZE);
      }
  
      if (isNaN(sizeInBytes)) {
        this.coverSize = 0;
        this.handleBadCover(BAD_COVER_CAUSE);
      }
    } catch (err) {
      console.log(err);
      this.crafter.setSnack(UNKWON_ERROR_SENTENCE, SnackTypeEnum.ERROR)
    }
  }

  private sendRequest(cover: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.xhr.open('HEAD', cover, true);
      this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState === this.xhr.DONE) {
          const size = parseInt(this.xhr.getResponseHeader('Content-Length')!, 10);
          !isNaN(size) ? resolve(size) : reject(new Error('Invalid content size'));
        }
      };
      this.xhr.send();
    });
  }

  public allDraftChecksOK(value: DraftCheck): boolean {
    return Object.values(value).every(i => i.ok)
  }

  private handleBadCover(cause: string): void {
    this.draft.check.hasGoodCover.ok = false;
    this.draft.check.hasGoodCover.cause = cause;
  }

  private navigate(): void {
    this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true});
  }

  public deleteDraftByID(): void {
    if (!this.draft) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => (
        this.draftsFacade.delete(this.draft._id, true),
        this.navigate()
    ));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.xhr?.abort();
  }

}
