import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { DraftPreviewDialogData, Post } from '@shared/types/interface.types';
import { Observable } from 'rxjs';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

const TIME_TO_SEEN = 5000;

@Component({
  selector: 'app-draft-preview',
  templateUrl: './draft-preview.component.html',
  styleUrls: ['./draft-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftPreviewComponent implements OnInit {

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
    if (
      this.data && 
      this.data.updateStatus && 
      this.data.draft?.status === 'not-seen'
    ) {
      this.timer = setTimeout(() => {
        this.draftsFacade.updateKey(this.data?.draft?._id, {key: 'status', value: 'seen'});
      }, TIME_TO_SEEN);
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }

}
