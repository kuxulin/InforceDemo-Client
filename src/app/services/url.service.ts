import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { SERVER_URL } from 'src/consts';
import Url from '../models/url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly routeApi = `${SERVER_URL}/Url`;
  urls$: Subject<Url[]> = new Subject<Url[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchUrls() {
    this.http
      .get<Url[]>(this.routeApi)
      .pipe(take(1))
      .subscribe({
        next: (res: Url[]) => this.urls$.next(res),
      });
  }

  createUrl(longVersion: string): Observable<any> {
    return this.http.post(
      this.routeApi,
      {
        longVersion,
      },
      {
        headers: this.authService.generateAuthHeaders(),
      }
    );
  }

  deleteUrl(id: string): Observable<any> {
    return this.http.delete(this.routeApi, {
      params: {
        id,
      },
      headers: this.authService.generateAuthHeaders(),
    });
  }
}
