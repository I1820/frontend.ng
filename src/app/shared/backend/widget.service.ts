import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BackendModule } from './backend.module';
import { Widget } from './widget.model';
import { AuthenticationService } from '../authentication';
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
    private authService: AuthenticationService,
    private bAPI: BackendAPI,
  ) {}

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
        if (!ws)
          return widgets;
        for (const i of Object.keys(ws)) {
          const w = ws[i];
          widgets.push(new Widget(w.title, w.type, w.pid, w.tid, w.asset, w.size));
        }
        return widgets;
      })
    );

  }
}
