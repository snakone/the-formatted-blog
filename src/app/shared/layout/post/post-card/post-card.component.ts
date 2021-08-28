import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { POST_MESSAGE, POST_MESSAGE_ALONE } from '@shared/data/data';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCardComponent implements OnInit {

  @Input() border = true;
  @Input() alone = false;

  message = POST_MESSAGE;
  messageAlone = POST_MESSAGE_ALONE;

  icons = [
    'fab fa-twitter',
    'fab fa-linkedin-in',
    'fas fa-user-plus',
    'far fa-envelope'
  ];

  constructor() { }

  ngOnInit(): void { }

}
