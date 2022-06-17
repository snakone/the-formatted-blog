import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UsersFacade } from '@store/users/users.facade';

@Injectable({providedIn: 'root'})

export class UserGuard implements CanActivate {

  constructor(
    private userFcd: UsersFacade,
    private router: Router
  ) { }
  
  canActivate(): Observable<boolean> {
    return this.userFcd.user$
     .pipe(
       map(res => res ? true : 
        (this.router.navigateByUrl('/home'), false)
      )
    )
  }
  
}
