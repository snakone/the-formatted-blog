import { Injectable} from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import {
  PostResponse,
  Post,
  KeyPair
} from '@shared/types/interface.types';

import { filter, map } from 'rxjs/operators';
import { Delta } from 'quill';

@Injectable({providedIn: 'root'})

export class DraftService {

  readonly API_POST = environment.api + 'drafts/';
  public page = 0;

  constructor(private http: HttpService) { }

  public get(): Observable<Post[] | undefined> {
    this.page++;
    return this.http
      .get<PostResponse>(this.API_POST + '?page=' + this.page)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.drafts)
      );
  }

  public getBySlug(slug: string): Observable<Post | undefined> {
    return this.http
      .get<PostResponse>(environment.api + 'draft/' + slug)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      );
  }

  public createDraft(draft: Post): Observable<Post | undefined> {
    return this.http
      .post<PostResponse>(this.API_POST, draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public updateDraft(draft: Post): Observable<Post | undefined> {
    return this.http
      .put<PostResponse>(this.API_POST, draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public updateDraftKey(id: string, keys: KeyPair): Observable<Post | undefined> {
    return this.http
      .put<PostResponse>(this.API_POST + 'key', {id, keys})
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public deleteDraft(id: string): Observable<Post | undefined> {
    return this.http
      .delete<PostResponse>(this.API_POST, {id})
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.draft)
      )
  }

  public resetPage(): void {
    this.page = 0;
  }

}