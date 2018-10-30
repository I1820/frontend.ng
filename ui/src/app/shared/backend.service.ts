import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

import { AuthenticationService } from './authentication/authentication.service';
import { Project } from './project.model';

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
  private errorLogger(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      this.logger.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      const err = <BackendError> error.error;
      this.logger.error('Backend Service:', 'Project List', `${err.code}: ${err.error}`);
    }
  }

  // projectList lists projects of authentication user.
  // This function converts projects to Project Model
  public projectsList(): Observable<Project[]> {
    this.logger.debug('Backend Service:', 'Projects List API is called');
    return this.http.get('/api/v1/projects').pipe(map(
      (ps: any[]) => {
        const projects: Project[] = [];
        for (const p of ps) {
          projects.push(new Project(p.name, p.id));
        }
        return projects;
      }), tap(
        (ps: Project[]) => {
          this.logger.info('Backend Service:', 'Projects List', ps);
        }, (error) => this.errorLogger(error))
    );
  }
}
