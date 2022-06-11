import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';

import { NOTIFICATION_TEXT } from '@shared/data/sentences';
import { Post } from '@shared/types/interface.types';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateComponent implements OnInit, OnDestroy {
  
  drafts$!: Observable<Post[]>;
  active$!: Observable<Post>;
  text = NOTIFICATION_TEXT;
  title!: string;
  private unsubscribe$ = new Subject<void>();

  constructor(private draftsFacade: DraftsFacade) {}

  ngOnInit(): void { 
    this.drafts$ = this.draftsFacade.drafts$;
    this.active$ = this.draftsFacade.active$;
    this.checkData();
  }

  private checkData(): void {
    this.draftsFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.draftsFacade.get());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
