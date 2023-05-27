import { Injectable } from '@angular/core';
import { filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { FormattedNew, NewsResponse } from '@shared/types/interface.types';

@Injectable()

export class NewsService {

  readonly API_NEWS = environment.api + 'news';

  constructor(
    private http: HttpService
  ) { }

  public getNews(): Observable<FormattedNew[]> {
    return this.http
      .get<NewsResponse>(this.API_NEWS)
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.news)
    );
  }

}