import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { DraftService } from '@core/services/api/drafts.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { Observable, catchError, filter, map, switchMap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SameUserGuard  {

  constructor(
    private userFcd: UsersFacade,
    private router: Router,
    private DraftSrv: DraftService,
    private crafter: CrafterService,
    private draftsFacade: DraftsFacade
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      return this.DraftSrv.getBySlug(route.params.slug)
      .pipe(
        filter(res => !!res),
        switchMap(draft => this.userFcd.user$.pipe(map(user => {
          if (user._id === draft.user) {
            this.draftsFacade.setBySlug(draft);
            return true;
          }
          return false;
        }))),
        map((res: boolean) => res || (this.router.navigateByUrl('/home'), false)),
        catchError(err => {
          this.crafter.setSnack('Parece ser que el contenido que buscas no existe', 'error');
          this.router.navigateByUrl('/home');
          throw err;
      }))
  }
  
}
