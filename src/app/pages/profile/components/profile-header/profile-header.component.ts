import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { USER_STATS } from '@shared/data/data';
import { User } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHeaderComponent implements OnInit {

  @Input() user!: User | null;
  list = USER_STATS;

  constructor() { }

  ngOnInit(): void { }

}
