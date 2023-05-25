import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivitiesFacade } from '@core/ngrx/activities/activities.facade';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { User, UserActivity } from '@shared/types/interface.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePublicComponent {

  public$: Observable<User> | undefined;
  activities$: Observable<UserActivity[]> | undefined;

  constructor(private userFacade: UsersFacade, private activityFacade: ActivitiesFacade, private postFacade: PostsFacade) { }

  ngOnInit() {
    this.public$ = this.userFacade.public$;
    this.activities$ = this.activityFacade.public$;
  }

  ngOnDestroy() {
    this.activityFacade.reset();
    this.postFacade.resetByUser();
  }

}
