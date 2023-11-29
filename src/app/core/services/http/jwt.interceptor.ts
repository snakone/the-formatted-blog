import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '@services/storage/storage.service';
import { UsersFacade } from '@store/users/users.facade';
import { USER_ID_KEY } from '@shared/data/constants';

@Injectable({providedIn: 'root'})

export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private userFacade: UsersFacade,
    private ls: StorageService
  ) { }

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {  // Invalid Token
          const id = this.ls.get(USER_ID_KEY);
          if (!id) throw err; 
          this.userFacade.refreshToken(id);
        }
        throw err;
      }));
  }
}