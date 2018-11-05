import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';

import { TokenStorage } from './token-storage.service';
import User from './user.model';

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) {}

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   */
  public isAuthorized(): Observable <boolean> {
    return this.tokenStorage
    .getAccessToken()
    .pipe(map(token => !!token));
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   */
  public getAccessToken(): Observable <string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   */
  public refreshToken(): Observable <User> {
    return this.tokenStorage
    .getRefreshToken()
    .pipe(
      switchMap((refreshToken: string) =>
        this.http.post(`/api/v1/auth/refresh`, { refreshToken })
      ),
      catchError((err) => {
        this.logout();

        return throwError(err);
      }),
      tap((user: User) => this.saveAccessData(user))
    );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    // If a user is logged in then its getUser does not return null so we refresh his token.
    // but when its getUser returns null this mean he tries to login.
    return this.getUser() && response.status === 401;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  /**
   * Login with username and password
   */
  public login(username: string, password: string): Observable<any> {
    return this.http.post(`/api/v1/auth/login`, { username, password })
    .pipe(tap((user: User) => this.saveAccessData(user)));
  }

  /**
   * Register user with given infromation
   */
  public signup(data: RegisterData): Observable<any> {
    console.log(data);
    return this.http.post(`/api/v1/auth/register`, data);
  }

  /**
   * Logout
   * There is no logout API for I1820, just remove the token and you are logged out
   */
  public logout(): void {
    this.tokenStorage.clear();
    location.reload(true);
  }

  /**
   * Get current user data
   */
  public getUser(): User {
    return this.tokenStorage.getUser();
  }

  /**
   * Save user data and token in the storage
   */
  private saveAccessData(user: User) {
    this.tokenStorage
      .setAccessToken(user.token)
      .setUser(user);
  }

}
