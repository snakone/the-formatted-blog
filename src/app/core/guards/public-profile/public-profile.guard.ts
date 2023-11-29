import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, filter, map, of, switchMap, take, tap } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { ActivitiesFacade } from '@core/ngrx/activities/activities.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { UserService } from '@core/services/api/users.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { UserResponse } from '@shared/types/interface.server';

import { SnackTypeEnum } from '@shared/types/types.enums';
import { HOME_ROUTE, PROFILE_ROUTE } from '@shared/data/constants';
import { WRONG_CONTENT_SENTENCE } from '@shared/data/sentences';
import { SameIDUser } from '@shared/types/interface.user';


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
      const userId = route.params.id;
      return combineLatest({
        public: this.userFacade.public$,
        current: this.userFacade.user$
      }).pipe(
        take(1),
        switchMap((res: SameIDUser) => this.handleSameUserID(res, userId)))
  }

  private handleSameUserID(res: SameIDUser, id: string): Observable<boolean> {
    return res.current && res.current._id === id ? 
            (this.router.navigateByUrl(PROFILE_ROUTE), of(false)) : 
            res.public && res.public._id === id ? 
            of(true) : this.fetchUserDataAndHandle(id)
  }

  private fetchUserDataAndHandle(id: string): Observable<boolean> {
    return this.userSrv.getByIdPublic(id).pipe(
      filter(Boolean),
      tap(res => this.setUserPublic(res)),
      map(res => Boolean(res.user) || (this.router.navigateByUrl(HOME_ROUTE), false)),
      catchError(err => {
        this.crafter.setSnack(WRONG_CONTENT_SENTENCE, SnackTypeEnum.ERROR);
        this.router.navigateByUrl(HOME_ROUTE);
        throw err;
      })
    );
  }

  private setUserPublic(res: UserResponse): void {
    this.userFacade.setPublic(res.user);
    this.activityFacade.setPublic(res.activities);
  }
  
}