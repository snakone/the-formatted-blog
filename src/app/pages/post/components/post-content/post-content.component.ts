import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { DUMMY_POST } from '@shared/data/data';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostContentComponent implements OnInit {

  @Input() draft: Post;
  item = DUMMY_POST[0];

  constructor() { }

  ngOnInit() { }

}
