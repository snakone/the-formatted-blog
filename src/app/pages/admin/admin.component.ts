import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminComponent {

  private unsubscribe$ = new Subject<void>();

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.checkData();
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
    this.draftsFacade.reset();
  }

}
