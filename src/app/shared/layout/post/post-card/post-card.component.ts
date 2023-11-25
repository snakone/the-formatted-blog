import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { QuillModules } from 'ngx-quill';

import { Post } from '@shared/types/interface.post';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { QuillService } from '@core/services/quill/quill.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UserService } from '@core/services/api/users.service';
import { ShareService } from '@core/services/share/share.service';
import { User } from '@shared/types/interface.user';

import { DRAFT_ICONS, POST_ICONS } from '@shared/data/data';
import { DELETE_CONFIRMATION, EDIT_POST_CONFIRMATION, PREVIEW_DRAFT_DIALOG } from '@shared/data/dialogs';
import { CREATE_ROUTE, POST_KEY, PROFILE_ROUTE } from '@shared/data/constants';
import { DraftStatusEnum } from '@shared/types/types.enums';

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
  draftStatus = DraftStatusEnum;
  private unsubscribe$ = new Subject<void>();

  quillModules: QuillModules = {
    syntax: true,
  };

  switchObjDraft: {[key: string]: () => void} = {
    edit: () => this.edit(),
    preview: () => this.preview(),
    download: () => this.download(),
    delete: () => this.delete(),
    favorite: () => this.favorite()
  };

  switchObjPost: {[key: string]: () => void} = {
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
    if (this.post.status === DraftStatusEnum.PENDING) { return; }
    this.draftsFacade.setActive(this.post);
    this.router.navigateByUrl(CREATE_ROUTE);
  }

  private preview(): void {
    this.draftsFacade.setPreview(this.post);
    this.crafter.dialog(PREVIEW_DRAFT_DIALOG);
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
    await this.shareSrv.share(this.post).catch(err => console.log(err));
  }

  private message(): void {
    console.log('message');
  }

  public friend(): void {
    this.router.navigateByUrl(PROFILE_ROUTE + '/' + this.post.user);
  }

  public editPost(): void {
    if (this.post.type !== POST_KEY) { return; }

    this.crafter.confirmation(EDIT_POST_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
    ).subscribe(_ => this.editSuccess());
  }

  private editSuccess(): void {
    this.post.temporal = true;
    this.draftsFacade.setActive(this.post);
    this.draftsFacade.addTemporal(this.post);
    this.router.navigate([CREATE_ROUTE], {replaceUrl: true});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
