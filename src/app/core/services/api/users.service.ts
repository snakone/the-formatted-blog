import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';

import {
  User,
  UserResponse
 } from '@shared/types/interface.types';

import { StorageService } from '@services/storage/storage.service';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class UserService {

  readonly API_USER = environment.api + 'user';

  private user!: User | null;

  constructor(
    private http: HttpService,
    private ls: StorageService
  ) { }

  public getUser(): User | null {
    return this.user || null;
  }

  public setUser(user: User | null): void {
    this.user = user;
  }

  public verifyToken(): Observable<User> {
    return this.http
      .get<UserResponse>(environment.api + 'token')
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.user),
        tap(_ => this.setUser(_))
      );
  }

  public refreshToken(id: string): Observable<User> {
    return this.http
      .post<UserResponse>(environment.api + 'token/' + id, null)
      .pipe(
        filter(res => !!res && res.ok),
        tap(_ => this.ls.setKey('token', _?.token)),
        map(res => res.user),
        tap(_ => this.setUser(_))
      );
  }

}