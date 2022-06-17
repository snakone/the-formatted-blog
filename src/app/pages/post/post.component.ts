import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent implements OnInit {

  draft$: Observable<Post>;
  text = NOTIFICATION_TEXT;

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.draft$ = this.draftsFacade.active$;
  }

  public notification(): void {
    console.log('home');
  }

}
