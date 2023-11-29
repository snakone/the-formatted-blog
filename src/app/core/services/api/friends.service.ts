import { Injectable } from '@angular/core';
import { filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { FriendsResponse } from '@shared/types/interface.server';
import { User } from '@shared/types/interface.user';

@Injectable({providedIn: 'root'})

export class FriendsService {

  readonly API_FRIENDS = environment.api + 'friends';

  constructor(
    private http: HttpService
  ) { }

  public addFriends(
    friends: string[]
  ): Observable<FriendsResponse> {
    const body = friends;
    return this.http
      .post<FriendsResponse>(this.API_FRIENDS, body)
      .pipe(
        filter(res => !!res && res.ok),
      );
  }

  public getFriendsByUser(): Observable<User[]> {
    return this.http
      .get<FriendsResponse>(this.API_FRIENDS)
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.friends)
    );
  }

}