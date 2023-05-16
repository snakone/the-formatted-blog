import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { PostResponse, Post } from '@shared/types/interface.types';

@Injectable({providedIn: 'root'})

export class PostService {

  readonly API_POST = environment.api + 'posts/';
  public page = 0;

  constructor(private http: HttpService) { }

  public get(): Observable<Post[]> {
    this.page++;
    return this.http
      .get<PostResponse>(this.API_POST + '?page=' + 1)
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

  public unPublishPost(post: Post): Observable<Post> {
    return this.http
      .post<PostResponse>(this.API_POST + 'unpublish', post)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.post)
      );
  }

  public resetPage(): void {
    this.page = 0;
  }

}