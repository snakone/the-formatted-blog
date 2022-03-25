import { Injectable} from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import {
  PostResponse,
  Post
} from '@shared/types/interface.types';

import { filter, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class PostService {

  readonly API_POST = environment.api + 'posts/';
  public page = 0;

  constructor(private http: HttpService) { }

  public get(): Observable<Post[]> {
    this.page++;
    return this.http
      .get<PostResponse>(this.API_POST + '?page=' + this.page)
      .pipe(
        filter(res => res && !!res.ok && !!res.posts),
        map(_ => _.posts)
      );
  }

  public getByUser(id: string): Observable<Post[]> {
    return this.http
      .get<PostResponse>(this.API_POST + 'user/' + id)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.posts)
      );
  }

  public getBySlug(slug: string): Observable<Post> {
    return this.http
      .get<PostResponse>(environment.api + 'post/' + slug)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.post)
      );
  }

  public resetPage(): void {
    this.page = 0;
  }

}