import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-home-sidebar',
  templateUrl: './profile-home-sidebar.component.html',
  styleUrls: ['./profile-home-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHomeSidebarComponent {

  @Input() user: User | undefined;

}
