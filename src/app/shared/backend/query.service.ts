import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendModule } from './backend.module';
import { BackendAPI } from './backend';
import { State, Partial } from './query.model';

/**
 * QueryService handles data queries.
 */
@Injectable({
  providedIn: BackendModule,
})
export class QueryService {

  constructor(
    private http: HttpClient,
    _bAPI: BackendAPI,
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
        const states: State[] = [];
        for (const s of ss) {
          states.push(new State(s));
        }
        return states;
      })
    );
  }

  /**
   * pfetch partialy fetches data since given date until given date. This function only fetches one asset.
   */
  @BackendAPI.api('Query', 'PFetch')
  public pfetch(id: string, tid: string, type: string, asset: string, since: Date, until: Date, ws: number): Observable<Partial[]> {
    return this.http.post(`/api/v1/projects/${id}/things/${tid}/queries/pfetch`,
      {
        range: {
          from: since.toISOString(),
          to: until.toISOString(),
        },
        type: type,
        target: asset,
        window: {
          size: ws,
        }
      }
    ).pipe(map(
      (ps: any[]) => {
        const partials: Partial[] = [];
        for (const p of ps) {
          partials.push(new Partial(p));
        }
        return partials;
      })
    );
  }

  /**
   * recently fetches given number of given asset's recent's data.
   */
  @BackendAPI.api('Query', 'Recently')
  public recently(id: string, tid: string, asset: string, n: number): Observable<State[]> {
    return this.http.post(`/api/v1/projects/${id}/things/${tid}/queries/recently`, {
      limit: n,
      asset: asset,
    }).pipe(map(
      (ss: any[]) => {
        const states: State[] = [];
        for (const s of ss) {
          states.push(new State(s));
        }
        return states;
      })
    );
  }

}
