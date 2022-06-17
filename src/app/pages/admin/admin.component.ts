import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminComponent implements OnInit, OnDestroy {

  drafts$!: Observable<Post[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.checkData();
    this.drafts$ = this.draftsFacade.all$;
  }

  private checkData(): void {
    this.draftsFacade.allLoaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.draftsFacade.getAll());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
