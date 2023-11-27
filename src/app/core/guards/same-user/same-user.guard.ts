import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, filter, map, switchMap } from 'rxjs';

import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { DraftService } from '@core/services/api/drafts.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { Post } from '@shared/types/interface.post';

import { HOME_ROUTE } from '@shared/data/constants';
import { SnackTypeEnum } from '@shared/types/types.enums';
import { WRONG_CONTENT_SENTENCE } from '@shared/data/sentences';

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
      const slug = route.params.slug;
      return this.DraftSrv.getBySlug(slug).pipe(
        filter(Boolean),
        switchMap(draft => this.handleDraftAuth(draft)),
        map(authorized => authorized || this.redirectToHome()),
        catchError(err => {
          this.handleDraftError();
          throw err;
      })
    );
  }

  private handleDraftAuth(draft: Post): Observable<boolean> {
    return this.userFcd.user$.pipe(
      map(user => user._id === draft.user ? 
        (this.draftsFacade.setBySlug(draft), true) : false
    ));
  }
  
  private redirectToHome(): boolean {
    this.router.navigateByUrl(HOME_ROUTE);
    return false;
  }
  
  private handleDraftError(): void {
    this.crafter.setSnack(WRONG_CONTENT_SENTENCE, SnackTypeEnum.ERROR);
    this.router.navigateByUrl(HOME_ROUTE);
  }
  
}
