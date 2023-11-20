import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EMPTY_RECENT_POST } from '@shared/data/data';
import { Post } from '@shared/types/interface.post';

@Component({
  selector: 'app-recent-post-box',
  templateUrl: './recent-post-box.component.html',
  styleUrls: ['./recent-post-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class RecentPostBoxComponent {

  @Input() posts: Post[] = EMPTY_RECENT_POST;
  @Input() margin: boolean | undefined;
  @Input() limit: number;

  constructor() { }

}
