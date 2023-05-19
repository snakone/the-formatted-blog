import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { Post } from '@shared/types/interface.types';
import { Subject, takeUntil, filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftComponent {

  draft$: Observable<Post> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private draftFacade: DraftsFacade) { }

  ngOnInit() {
    this.draft$ = this.draftFacade.bySlug$;
    this.getDraftBySlug();
  }

  private getDraftBySlug(): void {
    this.route.paramMap
    .pipe(
      takeUntil(this.unsubscribe$),
      filter(res => !!res && !!res.get('slug')),
      map(res => res.get('slug')),
    ).subscribe((slug: string) => this.draftFacade.getBySlug(slug));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
