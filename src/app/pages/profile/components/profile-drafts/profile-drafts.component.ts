import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-drafts',
  templateUrl: './profile-drafts.component.html',
  styleUrls: ['./profile-drafts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDraftsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
