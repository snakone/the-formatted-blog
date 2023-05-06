import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ActiveGuard {

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
