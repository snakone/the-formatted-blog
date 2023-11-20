import { Injectable} from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import {
  Post,
} from '@shared/types/interface.post';

import { filter, map } from 'rxjs/operators';
import { DraftResponse } from '@shared/types/interface.server';
import { KeyPair } from '@shared/types/interface.app';

@Injectable({providedIn: 'root'})

export class DraftService {

  readonly API_POST = environment.api + 'drafts/';

  constructor(private http: HttpService) { }

  public get(): Observable<Post[] | undefined> {
    return this.http
      .get<DraftResponse>(this.API_POST)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.drafts)
      );
  }

  public getAll(): Observable<Post[] | undefined> {
    return this.http
      .get<DraftResponse>(this.API_POST + 'all')
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.drafts)
      );
  }

  public getBySlug(slug: string): Observable<Post | undefined> {
    return this.http
      .get<DraftResponse>(environment.api + 'draft/' + slug)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      );
  }

  public createDraft(draft: Post): Observable<Post | undefined> {
    return this.http
      .post<DraftResponse>(this.API_POST, draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public updateDraft(draft: Post): Observable<Post | undefined> {
    return this.http
      .put<DraftResponse>(this.API_POST, draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public updateDraftKey(
    id: string,
    keys: KeyPair
  ): Observable<Post | undefined> {
    return this.http
      .put<DraftResponse>(this.API_POST + 'key', {id, keys})
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public deleteDraft(id: string): Observable<Post | undefined> {
    return this.http
      .delete<DraftResponse>(this.API_POST, {id})
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public publishDraft(draft: Post): Observable<Post> {
    return this.http
      .post<DraftResponse>(this.API_POST + 'publish', draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.draft)
      );
  }

}