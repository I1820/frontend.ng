import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendModule } from './backend.module';
import { Darksky } from './darksky.model';
import { BackendAPI } from './backend';

/**
 * WeatherService handles weather APIs. These APIs have many different data forms
 * because of their source.
 */
@Injectable({
  providedIn: BackendModule,
})
export class WeatherService {

  constructor(
    private http: HttpClient,
    private bAPI: BackendAPI,
  ) {}

  /**
   * weatherDarksky get forecast data from wf component darksky service.
   */
  @BackendAPI.api('Weather', 'Darksky')
  public darksky(lat: number, lng: number): Observable<Darksky> {
    return this.http.post(`/api/v1/wf/darksky`, { lat, lng }).pipe(map(
      (w: any) => {
        return new Darksky(w);
      })
    );
  }

}
