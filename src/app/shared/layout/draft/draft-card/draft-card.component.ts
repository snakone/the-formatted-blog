import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post, SavingType } from '@shared/types/interface.types';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-draft-card',
  templateUrl: './draft-card.component.html',
  styleUrls: ['./draft-card.component.scss']
})

export class DraftCardComponent {

  @Input() draft: Post | undefined;
  @Input() id: string | undefined; // DELETE
  @Input() last: boolean | undefined;
  @Input() saving: SavingType | undefined;
  @Input() set index(value: number) {
    document.body.clientWidth >= 993 || document.body.clientWidth <= 650 ? 
      this._index = undefined : 
      this._index = value;
  }

  _index: number | undefined;

  constructor(private draftsFacade: DraftsFacade) { }

  public activate(draft: Post): void {
    if (this.saving?.value) { return; }
    this.draftsFacade.setActive(draft);

    if (document.body.clientWidth <= 642) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

}
