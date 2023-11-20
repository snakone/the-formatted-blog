import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card-skeleton',
  templateUrl: './post-card-skeleton.component.html',
  styleUrls: ['./post-card-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCardSkeletonComponent {

  @Input() small = false;  // Small Card
  @Input() showIntro: boolean = true;
  @Input() last: boolean;

}
