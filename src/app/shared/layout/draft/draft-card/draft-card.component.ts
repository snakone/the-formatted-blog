import { Component, Input } from '@angular/core';
import { Post } from '@shared/types/interface.types';
import { DraftsFacade } from '@store/drafts/drafts.facade';

@Component({
  selector: 'app-draft-card',
  templateUrl: './draft-card.component.html',
  styleUrls: ['./draft-card.component.scss']
})

export class DraftCardComponent {

  @Input() draft: Post | undefined;
  @Input() id: string | undefined; // DELETE

  constructor(private draftsFacade: DraftsFacade) { }

  public activate(draft: Post): void {
    this.draftsFacade.setActive(draft);

    if (document.body.clientWidth <= 642) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

}
