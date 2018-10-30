import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from './authentication/authentication.service';
import { Project } from './project.model'

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
  ) {}

  // projectList lists projects of authentication user.
  // This function converts projects to Project Model
  public projectsList(): Observable<Project[]> {
    return this.http.get('/api/v1/projects').pipe(map(
      (ps: any[]) => {
        const projects: Project[] = [];
        for (const p of ps) {
          projects.push(new Project(p.name, p.id));
        }
        return projects;
      }
    ));
  }
}
