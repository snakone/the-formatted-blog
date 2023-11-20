import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/types/interface.user';
import { UsersFacade } from '@store/users/users.facade';
import { filter, map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AdminGuard  {

  constructor(
    private userFcd: UsersFacade,
    private router: Router
  ) { }
  
  canActivate(): Observable<boolean> {
    return this.userFcd.user$
     .pipe(
       filter(user => !!user),
       map((user: User | null) => 
        user?.account === 'Admin' || 
        user?.account === 'Super' || 
        (this.router.navigateByUrl('/home'), false)
      )
    )
  }
  
}
