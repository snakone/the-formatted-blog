import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

import { Post } from '@shared/types/interface.types';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { DELETE_CONFIRMATION, DRAFT_ICONS, POST_ICONS } from '@shared/data/data';
import { DraftPreviewComponent } from '@layout/overlays/draft-preview/draft-preview.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCardComponent implements OnInit {

  @Input() post: Post | undefined;
  @Input() border = true;
  @Input() alone = false;  // Single Post
  @Input() small = false;  // Small Card
  @Input() last!: boolean;
  @Input() draft!: boolean;  // Draft Card

  postIcons = POST_ICONS;
  draftIcons = DRAFT_ICONS;
  private unsubscribe$ = new Subject<void>();

  switchObj: any = {
    edit: () => this.edit(),
    preview: () => this.preview(),
    download: () => this.download(),
    delete: () => this.delete()
  };

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade,
    private router: Router
  ) { }

  ngOnInit(): void { }

  private edit(): void {
    this.draftsFacade.setActive(this.post);
    this.router.navigateByUrl('/create');
  }

  private preview(): void {
    this.crafter.dialog(DraftPreviewComponent, this.post.message);
  }

  private download(): void {

  }

  private delete(): void {
    if (!this.post) { return; }
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ => this.draftsFacade.delete(this.post._id));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
