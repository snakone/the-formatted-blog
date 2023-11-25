import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.post';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DraftPreviewDialogData } from '@shared/types/interface.app';
import { STATUS_KEY } from '@shared/data/constants';
import { DraftStatusEnum } from '@shared/types/types.enums';

const TIME_TO_BE_SEEN = 10000;

@Component({
  selector: 'app-draft-preview',
  templateUrl: './draft-preview.component.html',
  styleUrls: ['./draft-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftPreviewDialogComponent implements OnInit {

  preview$: Observable<Post>;
  timer: NodeJS.Timer;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DraftPreviewDialogData,
    private draftsFacade: DraftsFacade
  ) { }

  ngOnInit(): void {
    this.preview$ = this.draftsFacade.preview$;
  }

  ngAfterViewInit() {
    if (!this.data?.updateStatus) { return; }
    const status = this.data.draft?.status;
    
    if (status === DraftStatusEnum.NOT_SEEN) {
      this.timer = setTimeout(() => {
        this.draftsFacade.updateKey(
          this.data?.draft?._id, 
          { key: STATUS_KEY, value: DraftStatusEnum.SEEN }, true
        );
      }, TIME_TO_BE_SEEN);
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer as any);
    }
  }

}
