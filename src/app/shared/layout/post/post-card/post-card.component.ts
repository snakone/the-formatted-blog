import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCardComponent implements OnInit {

  @Input() post: Post | undefined;
  @Input() border = true;
  @Input() alone = false;
  @Input() small = false;
  @Input() last!: boolean;

  icons = [
    'fab fa-twitter',
    'fab fa-linkedin-in',
    'fas fa-user-plus',
    'far fa-envelope'
  ];

  constructor() { }

  ngOnInit(): void { }

}
