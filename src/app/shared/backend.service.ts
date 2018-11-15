import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { NotificationsService} from 'angular2-notifications';

import { AuthenticationService } from './authentication/authentication.service';
import { Project } from './project.model';
import { Thing } from './thing.model';
import { Darksky } from './darksky.model';

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

  /**
   * errorLogger logs every error on backend communication
   */
  private errorLogger(error: HttpErrorResponse, apiName: string): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      this.logger.error('An error occurred:', error.error.message);
      this.notifService.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      const err = <BackendError> error.error;
      this.logger.error('Backend Service:', apiName, `${err.statusCode}: ${err.message}`);
      this.notifService.error(apiName, `${err.statusCode}: ${err.message}`);
    }
  }

  /**
   * pmHealth checks the status of pm component.
   * This API does not log or show error to user
   */
  public pmHealth(): Observable<boolean> {
    return this.http.get('/api/v1/health/pm').pipe(map(
      (s: any) => {
        return s === true;
      }
    ));
  }

  /**
   * wfHealth checks the status of wf component.
   * This API does not log or show error to user
   */
  public wfHealth(): Observable<boolean> {
    return this.http.get('/api/v1/health/wf').pipe(map(
      (s: any) => {
        return s === true;
      }
    ));
  }


  /**
   * projectsNew creates new project with given name.
   * As described in the backend documentation after project creation
   * token refreshing is required so this function does refresh token in middle of the process.
   */
  public projectsNew(name: string, env: Object = {}): Observable<Project> {
    const apiName = 'Projects Creation';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.post('/api/v1/projects', { name, env }).pipe(map(
      (p: any) => {
        return new Project(p.name, p.id);
      }), tap(
        (p: Project) => {
          this.logger.info('Backend Service:', apiName, p);
        }, (error) => this.errorLogger(error, apiName)
      ), tap(() => {}, () => {}, // token refreshing when observer completes
        () => {
          this.authService.refreshToken().subscribe((u) => {});
        }
      ),
    );

  }

  /**
   * projectList lists projects of authentication user.
   * This function converts projects to Project Model
   */
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

  /**
   * projectsShow shows detail about given project identification.
   */
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

  /**
   * projectsThings lists things of given project identification.
   */
  public projectsThings(id: string): Observable<Thing[]> {
    const apiName = 'Projects Things';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.get(`/api/v1/projects/${id}/things`).pipe(map(
      (ts: any[]) => {
        const things: Thing[] = [];
        for (const t of ts) {
          things.push(new Thing(t.name, t.id, t.model, t.location.coordinates[1], t.location.coordinates[0]));
        }
        return things;
      }), tap(
        (ts: Thing[]) => {
          this.logger.info('Backend Service:', apiName, ts);
        }, (error) => this.errorLogger(error, apiName))
    );
  }

  /**
   * thingsNew creates new thing in given project.
   */
  public thingsNew(id: string, name: string, lat: number, long: number): Observable<Thing> {
    const apiName = 'Things Creation';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.post(`/api/v1/projects/${id}/things`, {name, location: {lat, long}}).pipe(map(
      (t: any) => {
        return new Thing(t.name, t.id, t.model, t.location.coordinates[1], t.location.coordinates[0]);
      }), tap(
        (t: Thing) => {
          this.logger.info('Backend Service:', apiName, t);
        }, (error) => this.errorLogger(error, apiName))
    );
  }

  /**
   * thingsShow shows detail about given thing identification
   */
  public thingsShow(id: string, tid: string): Observable<Thing> {
    const apiName = 'Things Show';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.get(`/api/v1/projects/${id}/things/${tid}`).pipe(map(
      (t: any) => {
        return new Thing(t.name, t.id, t.model, t.location.coordinates[1], t.location.coordinates[0]);
      }), tap(
        (t: Thing) => {
          this.logger.info('Backend Service:', apiName, t);
        }, (error) => this.errorLogger(error, apiName))
    );
  }

  /**
   * weatherDarksky get forecast data from wf component darksky service.
   */
  public weatherDarksky(lat: number, lng: number): Observable<any> {
    const apiName = 'Weather Darksky';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.post(`/api/v1/wf/darksky`, { lat, lng }).pipe(map(
      (w: any) => {
        return new Darksky(w);
      }), tap(
        (w: Darksky) => {
          this.logger.info('Backend Service:', apiName, w);
        }, (error) => this.errorLogger(error, apiName))
    );
  }
}
