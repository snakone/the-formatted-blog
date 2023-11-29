import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { User } from '@shared/types/interface.user';
import { UsersFacade } from '@store/users/users.facade';
import { AccountTypeEnum } from '@shared/types/types.enums';
import { HOME_ROUTE } from '@shared/data/constants';

@Injectable({providedIn: 'root'})

export class AdminGuard  {

  constructor(
    private userFcd: UsersFacade,
    private router: Router
  ) { }
  
  canActivate(): Observable<boolean> {
    return this.userFcd.user$
     .pipe(
       filter(Boolean),
       map((user: User) => 
        user.account === AccountTypeEnum.ADMIN || 
        user.account === AccountTypeEnum.SUPER || 
        (this.router.navigateByUrl(HOME_ROUTE), false)
      )
    )
  }
  
}
