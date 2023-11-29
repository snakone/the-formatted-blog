import { Injectable } from '@angular/core';
import { filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { FavoriteResponse } from '@shared/types/interface.server';

@Injectable({providedIn: 'root'})

export class FavoriteService {

  readonly API_FAVORITE = environment.api + 'favorite';

  constructor(
    private http: HttpService
  ) { }

  public addFavorites(
    favorites: string[]
  ): Observable<FavoriteResponse> {
    const body = favorites;
    return this.http
      .post<FavoriteResponse>(this.API_FAVORITE, body)
      .pipe(
        filter(res => !!res && res.ok),
      );
  }

  public getFavoritesByUser(): Observable<string[]> {
    return this.http
      .get<FavoriteResponse>(this.API_FAVORITE)
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.favorites)
    );
  }

}