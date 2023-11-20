import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivitiesFacade } from '@core/ngrx/activities/activities.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { User, UserActivity } from '@shared/types/interface.user';
import { Observable, Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileHomeComponent implements OnInit {

  user$: Observable<User> | undefined;
  activities$: Observable<UserActivity[]> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(private userFacade: UsersFacade, private activityFacade: ActivitiesFacade) { }

  ngOnInit(): void {
    this.checkData();
    this.user$ = this.userFacade.user$;
    this.activities$ = this.activityFacade.activities$;
  }

  private checkData(): void {
    this.activityFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.activityFacade.get());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.activityFacade.reset();
  }

}
