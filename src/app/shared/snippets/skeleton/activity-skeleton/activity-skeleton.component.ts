import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-skeleton',
  templateUrl: './activity-skeleton.component.html',
  styleUrls: ['./activity-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActivitySkeletonComponent {

  @Input() last: boolean;

}
