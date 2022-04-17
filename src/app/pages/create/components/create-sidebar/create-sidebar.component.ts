import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DRAFT_LIST } from '@shared/data/data';
import { DraftList } from '@shared/types/interface.types';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateSidebarComponent implements OnInit {

  list = DRAFT_LIST;

  constructor() { }

  ngOnInit(): void { }

  public activate(item: DraftList): void {
    this.list.map(l => l.active = false);
    item.active = true;
  }

}
