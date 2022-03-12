import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UsersFacade } from '@core/ngrx/users/users.facade';

@Injectable({providedIn: 'root'})

export class UserGuard implements CanLoad {

  constructor(
    private userFcd: UsersFacade,
    private router: Router
  ) { }
  
  canLoad(): Observable<boolean> {
    return this.userFcd.user$
     .pipe(
       map(res => res ? true : 
        (this.router.navigateByUrl('/home'), false)
      )
    )
  }
  
}
