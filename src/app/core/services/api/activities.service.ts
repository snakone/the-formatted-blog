import { Injectable } from '@angular/core';
import { filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { ActivitiesResponse, UserActivity } from '@shared/types/interface.types';

@Injectable({providedIn: 'root'})

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