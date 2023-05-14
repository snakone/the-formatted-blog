import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { Post } from '@shared/types/interface.types';
import { Subject, takeUntil, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-admin-draft',
  templateUrl: './admin-draft.component.html',
  styleUrls: ['./admin-draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminDraftComponent {

  draft$: Observable<Post> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(private draftsFacade: DraftsFacade, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getDraftByID();
  }

  private getDraftByID(): void {
    this.draft$ = this.route.paramMap
    .pipe(
      takeUntil(this.unsubscribe$),
      switchMap((res: ParamMap) => this.draftsFacade.byID$(res.get('id'))));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
