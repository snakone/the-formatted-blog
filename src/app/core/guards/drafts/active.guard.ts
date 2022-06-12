import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ActiveGuard implements CanActivate {

  constructor(
    private draftsFacade: DraftsFacade,
    private router: Router
  ) { }
  
  canActivate(): Observable<boolean> {
    return this.draftsFacade.active$
     .pipe(
       map(res => res ? true : 
        (this.router.navigateByUrl('/create'), false)
      )
    )
  }
  
}
