import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { NotificationsService} from 'angular2-notifications';

import { BackendModule } from './backend.module'
import { Project } from '../project.model';
import { Thing } from '../thing.model';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * BackendError represents errors from backend proxy that is based on hapi.js.
 */
interface BackendError {
  error: string;
  message: string;
  statusCode: number;
}

/**
 * BackendAPI is a factory for api decorators.
 */
@Injectable({
  providedIn: BackendModule,
})
export class BackendAPI {
  private static logger: NGXLogger;
  private static notifService: NotificationsService;

  constructor(
    logger: NGXLogger,
    notifService: NotificationsService,
  ) {
    BackendAPI.logger = logger;
    BackendAPI.notifService = notifService;
  }

  /**
   * errorLogger logs every error on backend communication
   */
  private static errorLogger(service: string, api: string, error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      BackendAPI.logger.error('An error occurred:', error.error.message);
      BackendAPI.notifService.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      const err = <BackendError> error.error;
      BackendAPI.logger.error(`${service} API:`, api, `${err.statusCode}: ${err.message}`);
      BackendAPI.notifService.error(`${service}: ${api}`, `${err.statusCode}: ${err.message}`);
    }
  }

  /**
   * api decorates api calls to add logging and error handling
   */
  public static api(service: string, api: string) {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(...any) => Observable<any>>) {
      let method = descriptor.value;
      descriptor.value = function () {
        BackendAPI.logger.debug(`${service} Service:`, `${api} API is being called`);
        return method.apply(this, arguments).pipe(
          tap(
            (v: any) => BackendAPI.logger.info(`${service} Service`, api, v),
            (error) => BackendAPI.errorLogger(service, api, error),
          )
        );
      }
    }
  }
}

/**
 * BackendService sends and receives requests with I1820 backend component.
 * Authentication handles by ngx-auth module and content type header is added by I1820 frontend proxy.
 * Each function in this service handles errors to show them in logs and with toasts but it throw them too so
 * caller can handle them again.
 */
@Injectable({
  providedIn: BackendModule,
})
export class BackendService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private bAPI: BackendAPI,
  ) {}

  /**
   * projectsNew creates new project with given name.
   * As described in the backend documentation after project creation
   * token refreshing is required so this function does refresh token in middle of the process.
   */
  @BackendAPI.api('Projects', 'New')
  public projectsNew(name: string, env: Object = {}): Observable<Project> {
    return this.http.post('/api/v1/projects', { name, env }).pipe(map(
      (p: any) => {
        return new Project(p.name, p.id);
      }), tap(() => {}, () => {}, // token refreshing when observer completes
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
  @BackendAPI.api('Projects', 'List')
  public projectsList(): Observable<Project[]> {
    return this.http.get('/api/v1/projects').pipe(map(
      (ps: any[]) => {
        const projects: Project[] = [];
        for (const p of ps) {
          projects.push(new Project(p.name, p.id));
        }
        return projects;
      })
    );
  }

  /**
   * projectsShow shows detail about given project identification.
   */
  @BackendAPI.api('Projects', 'Show')
  public projectsShow(id: string): Observable<Project> {
    return this.http.get(`/api/v1/projects/${id}`).pipe(map(
      (p: any) => {
        const project: Project = new Project(p.name, p.id);
        return project;
      }
    ));
  }

  /**
   * projectsThings lists things of given project identification.
   */
  @BackendAPI.api('Projects', 'Things')
  public projectsThings(id: string): Observable<Thing[]> {
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
   * thingsNew creates new thing in given project.
   */
  @BackendAPI.api('Things', 'New')
  public thingsNew(id: string, name: string, lat: number, long: number): Observable<Thing> {
    return this.http.post(`/api/v1/projects/${id}/things`, {name, location: {lat, long}}).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }

  /**
   * thingsShow shows detail about given thing identification
   */
  @BackendAPI.api('Things', 'Show')
  public thingsShow(id: string, tid: string): Observable<Thing> {
    return this.http.get(`/api/v1/projects/${id}/things/${tid}`).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }

  /**
   * thingsTokensNew creates new token for given thing identification
   */
  @BackendAPI.api('Things Tokens', 'New')
  public thingsTokensNew(id: string, tid: string): Observable<Thing> {
    return this.http.get(`/api/v1/projects/${id}/things/${tid}/tokens`).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }

  /**
   * thingsTokensNew removes given token from given thing identification
   */
  @BackendAPI.api('Things Tokens', 'Deletion')
  public thingsTokensDelete(id: string, tid: string, token: string): Observable<Thing> {
    return this.http.delete(`/api/v1/projects/${id}/things/${tid}/tokens/${token}`).pipe(map(
      (t: any) => {
        return new Thing(t);
      })
    );
  }
}
