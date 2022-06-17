import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersFacade } from '@store/users/users.facade';
import { User } from '@shared/types/interface.types';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AdminGuard implements CanActivate {

  constructor(
    private userFcd: UsersFacade,
    private router: Router
  ) { }
  
  canActivate(): Observable<boolean> {
    return this.userFcd.user$
     .pipe(
       map((res: User) => 
        res?.account === 'Admin' || 
        res?.account === 'Super' ? true : 
        (this.router.navigateByUrl('/home'), false)
      )
    )
  }
  
}
