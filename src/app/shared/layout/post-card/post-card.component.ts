import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCardComponent implements OnInit {

  icons = [
    'fab fa-twitter',
    'fab fa-linkedin-in',
    'fas fa-user-plus',
    'far fa-envelope'
  ];

  constructor() { }

  ngOnInit(): void { }

}
