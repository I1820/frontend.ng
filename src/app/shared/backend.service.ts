import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { NotificationsService} from 'angular2-notifications';

import { AuthenticationService } from './authentication/authentication.service';
import { Project } from './project.model';
import { Thing } from './thing.model';

/**
 * BackendError represents errors from backend proxy that is based on hapi.js.
 */
interface BackendError {
  error: string;
  message: string;
  statusCode: number;
}

/**
 * BackendService sends and receives requests with I1820 backend component.
 * Authentication handles by ngx-auth module and content type header is added by I1820 frontend proxy.
 * Each function in this service handles errors to show them in logs and with toasts but it throw them too so
 * caller can handle them again.
 */
@Injectable()
export class BackendService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private logger: NGXLogger,
    private notifService: NotificationsService,
  ) {}

  // errorLogger logs every error on backend communication
  private errorLogger(error: HttpErrorResponse, apiName: string): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      this.logger.error('An error occurred:', error.error.message);
      this.notifService.error('An error occurred:', error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      const err = <BackendError> error.error;
      this.logger.error('Backend Service:', apiName, `${err.statusCode}: ${err.message}`);
      this.notifService.error(apiName, `${err.statusCode}: ${err.message}`);
    }
  }

  // projectList lists projects of authentication user.
  // This function converts projects to Project Model
  public projectsList(): Observable<Project[]> {
    const apiName = 'Projects List';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.get('/api/v1/projects').pipe(map(
      (ps: any[]) => {
        const projects: Project[] = [];
        for (const p of ps) {
          projects.push(new Project(p.name, p.id));
        }
        return projects;
      }), tap(
        (ps: Project[]) => {
          this.logger.info('Backend Service:', apiName, ps);
        }, (error) => this.errorLogger(error, apiName))
    );
  }

  // projectsShow shows detail about given project identification.
  public projectsShow(id: string): Observable<Project> {
    const apiName = 'Projects Show';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.get(`/api/v1/projects/${id}`).pipe(map(
      (p: any) => {
        const project: Project = new Project(p.name, p.id);
        return project;
      }), tap(
        (p: Project) => {
          this.logger.info('Backend Service:', apiName, p);
        }, (error) => this.errorLogger(error, apiName))
    );
  }

  // projectsThings lists things of given project identification.
  public projectsThings(id: string): Observable<Thing[]> {
    const apiName = 'Projects Things';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.get(`/api/v1/projects/${id}/things`).pipe(map(
      (ts: any[]) => {
        const things: Thing[] = [];
        for (const t of ts) {
          ts.push(new Thing(t.name, t.id, t.model));
        }
        return things;
      }), tap(
        (ts: Thing[]) => {
          this.logger.info('Backend Service:', apiName, ts);
        }, (error) => this.errorLogger(error, apiName))
    );
  }

  // weatherDarksky get forecast data from wf component darksky service.
  public weatherDarksky(lat: number, lng: number): Observable<any> {
    const apiName = 'Weather Darksky';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.post(`/api/v1/wf/darksky`, { lat, lng }).pipe(map(
      (ws: any[]) => {
        return ws;
      }), tap(
        (ws: any[]) => {
          this.logger.info('Backend Service:', apiName, ws);
        }, (error) => this.errorLogger(error, apiName))
    );

  }
}
