import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ActivitiesFacade } from '@core/ngrx/activities/activities.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { UserService } from '@core/services/api/users.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { WRONG_CONTENT_SENTENCE } from '@shared/data/sentences';
import { Observable, catchError, filter, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class PublicProfileGuard  {

  constructor(
    private router: Router,
    private userSrv: UserService,
    private crafter: CrafterService,
    private userFacade: UsersFacade,
    private activityFacade: ActivitiesFacade
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      return this.userSrv.getById(route.params.id)
      .pipe(
        filter(res => !!res),
        tap(res => (
          this.userFacade.setPublic(res.user),
          this.activityFacade.setPublic(res.activities)
        )),
        map(res => !!res.user),
        map((res: boolean) => res || (this.router.navigateByUrl('/home'), false)),
        catchError(err => {
          this.crafter.setSnack(WRONG_CONTENT_SENTENCE, 'error');
          this.router.navigateByUrl('/home');
          throw err;
      }))
  }
  
}