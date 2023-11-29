import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { Post } from '@shared/types/interface.post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftComponent {

  draft$: Observable<Post> | undefined;

  constructor(private draftFacade: DraftsFacade) { }

  ngOnInit() {
    this.draft$ = this.draftFacade.bySlug$;
  }

}
