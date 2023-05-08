import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post, SavingType } from '@shared/types/interface.types';
import { DraftsFacade } from '@store/drafts/drafts.facade';

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

  constructor(private draftsFacade: DraftsFacade) { }

  public activate(draft: Post): void {
    if (this.saving?.value) { return; }
    this.draftsFacade.setActive(draft);
  }


}
