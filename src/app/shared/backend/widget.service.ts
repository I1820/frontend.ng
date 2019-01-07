import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendModule } from './backend.module';
import { Widget, MapView } from './widget.model';
import { BackendAPI } from './backend';



/**
 * WidgetSerivce stores and retrieves widgets.
 */
@Injectable({
  providedIn: BackendModule,
})
export class WidgetService {
  constructor(
    private http: HttpClient,
    _bAPI: BackendAPI,
  ) {}


  /**
   * storeMap stores user map view in user's additional info
   */
  @BackendAPI.api('Widget', 'Store Map')
  public storeMap(view: MapView): Observable<boolean> {
    return this.http.post('/api/v1/info/map', view).pipe(map(
      (t: any) => {
        return t === true;
      })
    );
  }

  /**
   * retrieveMap retrieves user map view
   */
  @BackendAPI.api('Widget', 'Retrieve Map')
  public retrieveMap(): Observable<MapView> {
    return this.http.get('/api/v1/info/map').pipe(map(
      (mv: any) => {
        if (mv) {
          return new MapView(mv.latitude, mv.longitude, mv.zoom);
        } else {
          return null;
        }
      })
    );

  }

  /**
   * store stores user widgets in user's additional info
   */
  @BackendAPI.api('Widget', 'Store')
  public store(ws: Widget[]): Observable<boolean> {
    return this.http.post('/api/v1/info/widgets', Object.assign({}, ws)).pipe(map(
      (t: any) => {
        return t === true;
      })
    );
  }

  /**
   * retrieve retrieves user widgets
   */
  @BackendAPI.api('Widget', 'Store')
  public retrieve(): Observable<Widget[]> {
    return this.http.get('/api/v1/info/widgets').pipe(map(
      (ws: any) => {
        const widgets: Widget[] = [];
        if (!ws) {
          return widgets;
        }
        for (const i of Object.keys(ws)) {
          const w = ws[i];
          widgets.push(new Widget(w.title, w.type, w.pid, w.tid, w.asset, w.size, w.params));
        }
        return widgets;
      })
    );
  }
}
