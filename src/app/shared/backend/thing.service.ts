import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendModule } from './backend.module'
import { Thing } from './thing.model';
import { BackendAPI } from './backend';



@Injectable({
  providedIn: BackendModule,
})
export class ThingService {

  constructor(
    private http: HttpClient,
    private bAPI: BackendAPI,
  ) {}

  /**
   * list lists things of given project identification.
   */
  @BackendAPI.api('Thing', 'List')
  public list(id: string): Observable<Thing[]> {
    return this.http.get(`/api/v1/projects/${id}/things`).pipe(map(
      (ts: any[]) => {
        const things: Thing[] = [];
        for (const t of ts) {
          things.push(new Thing(t));
        }
        return things;
      })
    );
  }

  /**
   * creates creates new thing in given project.
   */
  @BackendAPI.api('Thing', 'Create')
  public create(id: string, name: string, lat: number, long: number): Observable<Thing> {
    return this.http.post(`/api/v1/projects/${id}/things`, {name, location: {lat, long}}).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }

  /**
   * show shows detail about given thing identification
   */
  @BackendAPI.api('Thing', 'Show')
  public show(id: string, tid: string): Observable<Thing> {
    return this.http.get(`/api/v1/projects/${id}/things/${tid}`).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }

  /**
   * tokenCreate creates new token for given thing identification
   */
  @BackendAPI.api('Thing:Token', 'Create')
  public tokenCreate(id: string, tid: string): Observable<Thing> {
    return this.http.get(`/api/v1/projects/${id}/things/${tid}/tokens`).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }

  /**
   * tokenRemove removes given token from given thing identification
   */
  @BackendAPI.api('Thing:Token', 'Remove')
  public tokenRemove(id: string, tid: string, token: string): Observable<Thing> {
    return this.http.delete(`/api/v1/projects/${id}/things/${tid}/tokens/${token}`).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }

}
