import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { DraftService } from '@core/services/api/drafts.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { Observable, catchError, filter, map, switchMap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SameUserGuard implements CanActivate {

  constructor(
    private userFcd: UsersFacade,
    private router: Router,
    private DraftSrv: DraftService,
    private crafter: CrafterService
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.DraftSrv.getBySlug(route.params.slug)
      .pipe(
        filter(res => !!res),
        switchMap(post => this.userFcd.user$.pipe(map(user => user._id === post.user))),
        map((res: boolean) => res || (this.router.navigateByUrl('/home'), false)),
        catchError(err => {
          this.crafter.setSnack('Parece ser que el contenido que buscas no existe', 'error');
          this.router.navigateByUrl('/home');
          throw err;
      }))
  }
  
}
