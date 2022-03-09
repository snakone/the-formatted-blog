import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-ranking',
  templateUrl: './profile-ranking.component.html',
  styleUrls: ['./profile-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileRankingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
