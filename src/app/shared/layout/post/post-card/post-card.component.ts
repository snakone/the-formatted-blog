import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

import { Post } from '@shared/types/interface.post';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { DELETE_CONFIRMATION, DRAFT_ICONS, EDIT_POST_CONFIRMATION, POST_ICONS } from '@shared/data/data';
import { DraftPreviewDialogComponent } from '@layout/overlays/draft-preview/draft-preview.component';
import { QuillService } from '@core/services/quill/quill.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UserService } from '@core/services/api/users.service';
import { ShareService } from '@core/services/share/share.service';
import { QuillModules } from 'ngx-quill';
import { User } from '@shared/types/interface.user';

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
  @Input() isDraft!: boolean;  // Draft Card
  @Input() favoritesID: string[] = [];
  @Input() showIntro: boolean = true;

  user: User | undefined;

  postIcons = POST_ICONS;
  draftIcons = DRAFT_ICONS;
  private unsubscribe$ = new Subject<void>();

  quillModules: QuillModules = {
    syntax: true,
  };

  switchObjDraft: any = {
    edit: () => this.edit(),
    preview: () => this.preview(),
    download: () => this.download(),
    delete: () => this.delete(),
    favorite: () => this.favorite()
  };

  switchObjPost: any = {
    friend: () => this.friend(),
    message: () => this.message(),
    download: () => this.download(),
    favorite: () => this.favorite()
  };

  constructor(
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade,
    private router: Router,
    private quillSrv: QuillService,
    private postFacade: PostsFacade,
    private userSrv: UserService,
    private shareSrv: ShareService
  ) { }

  ngOnInit(): void { 
    this.getUser();
  }

  private getUser(): void {
    this.user = this.userSrv.getUser();
  }

  private edit(): void {
    if (this.post.status === 'pending') { return; }
    this.draftsFacade.setActive(this.post);
    this.router.navigateByUrl('/create');
  }

  private preview(): void {
    this.draftsFacade.setPreview(this.post);
    this.crafter.dialog(DraftPreviewDialogComponent, null, undefined, 'preview');
  }

  private download(): void {
    this.quillSrv.convertToHTML(this.post);
  }

  public favorite(): void {
    this.postFacade.addFavorite(this.post._id);
  }

  public removeFavorite(): void {
    this.postFacade.removeFavorite(this.post._id);
  }

  private delete(): void {
    this.crafter.confirmation(DELETE_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
    ).subscribe(_ => this.draftsFacade.delete(this.post._id));
  }

  public async share(): Promise<void> {
    await this.shareSrv.share(this.post)
     .catch(err => console.log(err));
  }

  private message(): void {
    console.log('message');
  }

  public friend(): void {
    this.router.navigateByUrl('/profile/' + this.post.user);
  }

  public editPost(): void {
    if (this.post.type !== 'post') { return; }

    this.crafter.confirmation(EDIT_POST_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
    ).subscribe(_ => {
      this.post.temporal = true;
      this.draftsFacade.setActive(this.post);
      this.draftsFacade.addTemporal(this.post);
      this.router.navigate(['/create'], {replaceUrl: true});
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
