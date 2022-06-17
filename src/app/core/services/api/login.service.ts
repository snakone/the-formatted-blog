import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { User, UserResponse } from '@shared/types/interface.types';
import { StorageService } from '../storage/storage.service';
import { UserService } from './users.service';

@Injectable({providedIn: 'root'})

export class LoginService {

  readonly API_LOGIN = environment.api + 'login';

  constructor(
    private http: HttpService,
    private ls: StorageService,
    private userSrv: UserService
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
        tap(_ => this.storage(_)),
        map(res => res.user)
      );
  }

  public signUp(user: User): Observable<User> {
    return this.http
      .post<UserResponse>(environment.api + 'users', user)
      .pipe(
        filter(res => !!res && res.ok),
        tap(_ => this.storage(_)),
        map(res => res.user)
      );
  }

  private storage(res: UserResponse): void {
    this.ls.setKey('token', res?.token);
    this.ls.setKey('id', res?.user._id);
    this.userSrv.setUser(res?.user);
  }

}