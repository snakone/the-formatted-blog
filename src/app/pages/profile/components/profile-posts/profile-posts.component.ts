import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DUMMY_POST } from '@shared/data/data';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePostsComponent implements OnInit {

  items!: Post[];

  constructor() { }

  ngOnInit(): void {
    this.items = DUMMY_POST;
  }

}
