import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '@shared/types/interface.post';

@Component({
  selector: 'app-post-sidebar',
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostSidebarComponent {

  @Input() post: Post;

  constructor() { }

}
