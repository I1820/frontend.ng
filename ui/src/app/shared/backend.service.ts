import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

import { AuthenticationService } from './authentication/authentication.service';
import { Project } from './project.model';
import { Thing } from './thing.model';

/**
 * BackendError represents errors from backend
 */
interface BackendError {
  trace: string;
  error: string;
  code: number;
}

@Injectable()
export class BackendService {

  // authentication header is inserted by ngx-auth.
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private logger: NGXLogger,
  ) {}

  // errorLogger logs every error on backend communication
  private errorLogger(error: HttpErrorResponse, apiName: string): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      this.logger.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      const err = <BackendError> error.error;
      this.logger.error('Backend Service:', apiName, `${err.code}: ${err.error}`);
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

  public projectsThings(id: string): Observable<Thing[]> {
    const apiName = 'Projects Things';

    this.logger.debug('Backend Service:', `${apiName} API is called`);

    return this.http.get(`/api/v1/projects/${id}/things`).pipe(map(
      (ts: any[]) => {
        const things: Thing[] = []
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
}
