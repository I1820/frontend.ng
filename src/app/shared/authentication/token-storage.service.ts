import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import User from './user.model';

@Injectable()
export class TokenStorage {

  /**
   * Get access token
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    return of(token);
  }

  /**
   * Get current user data
   * User data is stored in json format so this function unmarshalls it.
   */
  public getUser(): User {
    const raw: string = <string>localStorage.getItem('user');
    const user: User = <User>JSON.parse(raw);
    return user;
  }

  /**
   * Get refresh token
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refreshToken');
    return of(token);
  }

  /**
   * Set access token
   */
  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);

    return this;
  }

  /**
   * Set current user data
   * User data is stored in json format so this function marshalls it.
   */
  public setUser(user: User): TokenStorage {
    localStorage.setItem('user', JSON.stringify(user));

    return this;
  }

  /**
   * Set refresh token
   */
  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);

    return this;
  }

  /**
   * Remove tokens and user
   */
  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}
