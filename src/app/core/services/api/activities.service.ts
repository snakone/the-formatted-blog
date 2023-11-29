import { Injectable } from '@angular/core';
import { filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { ActivitiesResponse } from '@shared/types/interface.server';
import { UserActivity } from '@shared/types/interface.user';

@Injectable()

export class ActivitiesService {

  readonly API_ACTIVITIES = environment.api + 'activities';

  constructor(
    private http: HttpService
  ) { }

  public getUserActivities(): Observable<UserActivity[]> {
    return this.http
      .get<ActivitiesResponse>(this.API_ACTIVITIES)
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.activities)
    );
  }

}