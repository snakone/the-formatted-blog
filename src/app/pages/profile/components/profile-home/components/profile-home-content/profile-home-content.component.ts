import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-home-content',
  templateUrl: './profile-home-content.component.html',
  styleUrls: ['./profile-home-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHomeContentComponent {

  @Input() user: User | undefined;

}
