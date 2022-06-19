import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-draft-card',
  templateUrl: './admin-draft-card.component.html',
  styleUrls: ['./admin-draft-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDraftCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
