import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHeaderComponent implements OnInit {

  items = [
    { name: 'like', icon: 'fas fa-heart' },
    { name: 'add', icon: 'fas fa-user-plus' },
    { name: 'comment', icon: 'fas fa-comments' },
    { name: 'link', icon: 'fas fa-link' },
    // { name: 'edit', icon: 'fas fa-edit' }
  ];

  constructor() { }

  ngOnInit(): void { }

}
