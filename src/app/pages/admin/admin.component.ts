import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DraftsFacade } from '@store/drafts/drafts.facade';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminComponent {

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.draftsFacade.getAll();
  }

}
