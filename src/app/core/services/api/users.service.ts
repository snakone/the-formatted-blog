import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { StorageService } from '@services/storage/storage.service';
import { UserResponse } from '@shared/types/interface.server';
import { User } from '@shared/types/interface.user';

import { TOKEN_KEY } from '@shared/data/constants';

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
      .get<UserResponse>(environment.api + TOKEN_KEY)
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
        tap(_ => this.ls.setKey(TOKEN_KEY, _?.token)),
        map(res => res.user),
        tap(_ => this.setUser(_))
      );
  }

  public update(user: User): Observable<User> {
    return this.http
      .put<UserResponse>(this.API_USER, user)
      .pipe(
        filter(res => res && !!res.ok),
        tap(_ => this.ls.setKey(TOKEN_KEY, _?.token)),
        map(res => res.user),
        tap(_ => this.setUser(_))
      );
  }

  public getByIdPublic(id: string): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(this.API_USER + '/' + id)
      .pipe(
        filter(res => !!res && res.ok)
      );
  }

}