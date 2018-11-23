import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendModule } from './backend.module';
import { BackendAPI } from './backend';
import { State } from './query.model';

/**
 * QueryService handles data queries.
 */
@Injectable({
  providedIn: BackendModule,
})
export class QueryService {

  constructor(
    private http: HttpClient,
    private bAPI: BackendAPI,
  ) {}

  /**
   * fetch fetches data since given date until given date. This function only fetches one asset.
   */
  @BackendAPI.api('Query', 'Fetch')
  public fetch(id: string, tid: string, type: string, asset: string, since: Date, until: Date): Observable<State[]> {
    return this.http.post(`/api/v1/projects/${id}/things/${tid}/queries/fetch`,
      {
        range: {
          from: since.toISOString(),
          to: until.toISOString(),
        },
        type: type,
        target: asset,
      }
    ).pipe(map(
      (ss: any[]) => {
        let states: State[] = [];
        for (let s of ss) {
          states.push(new State(s));
        }
        return states;
      })
    );
  }
}
