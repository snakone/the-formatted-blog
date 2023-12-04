import { Injectable } from '@angular/core';
import { filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { SearchResponse } from '@shared/types/interface.server';
import { SearchResult } from '@shared/types/interface.user';

@Injectable({providedIn: 'root'})

export class SearchService {

  readonly API_SEARCH = environment.api + 'search';

  constructor(
    private http: HttpService
  ) { }

  public search(value: string, id: string): Observable<SearchResult> {
    return this.http
      .post<SearchResponse>(this.API_SEARCH + '/' + id, {value})
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.result)
    );
  }

}