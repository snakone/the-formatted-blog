import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCardComponent implements OnInit {

  @Input() border = true;

  icons = [
    'fab fa-twitter',
    'fab fa-linkedin-in',
    'fas fa-user-plus',
    'far fa-envelope'
  ];

  constructor() { }

  ngOnInit(): void { }

}
