import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-draft-preview',
  templateUrl: './draft-preview.component.html',
  styleUrls: ['./draft-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftPreviewComponent implements OnInit {

  preview$: Observable<Post>;

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.preview$ = this.draftsFacade.preview$;
  }

}
