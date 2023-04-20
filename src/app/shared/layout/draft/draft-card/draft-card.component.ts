import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@shared/types/interface.types';
import { DraftsFacade } from '@store/drafts/drafts.facade';

@Component({
  selector: 'app-draft-card',
  templateUrl: './draft-card.component.html',
  styleUrls: ['./draft-card.component.scss']
})

export class DraftCardComponent implements OnInit {

  @Input() draft: Post;

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void { }

  public activate(draft: Post): void {
    this.draftsFacade.setActive(draft);

    if (document.body.clientWidth <= 642) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

}
