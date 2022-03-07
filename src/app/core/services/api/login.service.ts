import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { User, UserResponse } from '@shared/types/interface.types';
import { StorageService } from '../storage/storage.service';

@Injectable({providedIn: 'root'})

export class LoginService {

  readonly API_LOGIN = environment.api + 'login';

  constructor(
    private http: HttpService,
    private ls: StorageService
  ) { }

  public signIn(
    email: string, 
    password: string
  ): Observable<User> {
    const body = { email, password };
    return this.http
      .post<UserResponse>(this.API_LOGIN, body)
      .pipe(
        filter(res => !!res && res.ok),
        tap(_ => (
          this.ls.setKey('token', _?.token),
          this.ls.setKey('id', _?.user._id)
        )),
        map(res => res.user)
      );
  }

  public signUp(user: User): Observable<User> {
    return this.http
      .post<UserResponse>(environment.api + 'users', user)
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.user)
      );
  }

}