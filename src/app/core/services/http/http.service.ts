import { Injectable } from '@angular/core';

import {
  HttpHeaders,
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable} from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { catchError } from 'rxjs/operators';

@Injectable()

export class HttpService {

  private readonly auth = 'formatted-token';
  private readonly access = 'x-Access';
  private readonly content = 'Content-type';
  private readonly accept = 'Accept';
  private readonly type = 'application/json';
  private readonly default = 'application/json';

  constructor(
    private http: HttpClient,
    private ls: StorageService
  ) {}

  public get<T>(url: string,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => {
              this.error(err);
              throw err;
            }
        ));
  }

  public post<T>(url: string,
                 body: any | null,
                 headers?: HttpHeaders,
                 params?: HttpParams): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => {
              this.error(err);
              throw err;
            }
    ));
  }

  public put<T>(url: string,
                body: any | null,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
    return this.http.put<T>(url, body, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => {
              this.error(err);
              throw err;
            }
        ));
  }

// tslint:disable-next-line: variable-name
  private createHeaders(_headers?: HttpHeaders): HttpHeaders {
    const contentType = _headers ? (_headers.get(this.type) || this.default) : this.default;
    const accept = _headers ? (_headers.get(this.accept) || this.default) : this.default;
    const headers = _headers || new HttpHeaders();
    const access = 'Antic\'s';

    return headers
      .set(this.auth, this.ls.get('token') || '')
      .set(this.content, contentType)
      .set(this.accept, accept)
      .set(this.access, access);
  }

  private error(err: HttpErrorResponse): void {
    switch (err.status) {
      case 406: console.log(err)
        break;
      case 401: console.log('Unauthorized')
        break;
      default: console.log(err)
    }
  }
}