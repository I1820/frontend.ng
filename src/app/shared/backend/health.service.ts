import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendModule } from './backend.module';

/**
 * HealthService provides health checking service for I1820 components.
 */
@Injectable({
  providedIn: BackendModule,
})
export class HealthService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * pm checks the status of pm component.
   */
  public pm(): Observable<boolean> {
    return this.http.get('/api/v1/health/pm').pipe(map(
      (s: any) => {
        return s === true;
      }
    ));
  }

  /**
   * wf checks the status of wf component.
   */
  public wf(): Observable<boolean> {
    return this.http.get('/api/v1/health/wf').pipe(map(
      (s: any) => {
        return s === true;
      }
    ));
  }

  /**
   * dm checks the status of wf component.
   */
  public dm(): Observable<boolean> {
    return this.http.get('/api/v1/health/dm').pipe(map(
      (s: any) => {
        return s === true;
      }
    ));
  }


}
