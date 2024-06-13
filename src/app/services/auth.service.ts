import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { CLAIMS, LOCAL_STORAGE, SERVER_URL } from 'src/consts';
import { jwtDecode } from 'jwt-decode';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User> = new BehaviorSubject(new User(undefined));
  private readonly routeApi = `${SERVER_URL}/Auth`;

  constructor(private http: HttpClient) {}

  logIn(name: string, password: string) {
    return this.http
      .post(`${this.routeApi}/login`, {
        name,
        password,
      })
      .pipe(tap((res) => this.setSession(res)));
  }

  private setSession(result: any) {
    localStorage.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(result.token));

    this.getUserFromToken();
  }

  private getUserFromToken() {
    let decodedToken: any = jwtDecode(this.getToken()!);
    this.user$.next({
      name: decodedToken[CLAIMS.NAME_CODE],
      roles: decodedToken[CLAIMS.ROLES_CODE],
    });
  }

  getToken() {
    return localStorage
      .getItem(LOCAL_STORAGE.TOKEN)
      ?.replace(/^"(.+(?="$))"$/, '$1');
  }

  logOut() {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    this.user$.next(new User(undefined));
  }

  isLoggenIn(): boolean {
    let token = this.getToken();
    return !!token;
  }

  generateAuthHeaders() {
    let token = this.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
