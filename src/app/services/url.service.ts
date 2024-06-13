import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from 'src/consts';
import Url from '../models/url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly routeApi = `${SERVER_URL}/Url`;
  urls$ = this.http.get<Url[]>(this.routeApi);

  constructor(private http: HttpClient, private authService: AuthService) {}

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
}
