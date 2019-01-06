import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BackendModule } from './backend.module';
import { Project } from './project.model';
import { AuthenticationService } from '../authentication';
import { BackendAPI } from './backend';



/**
 * ProjectService handles project related APIs.
 */
@Injectable({
  providedIn: BackendModule,
})
export class ProjectService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    _bAPI: BackendAPI,
  ) {}

  /**
   * create creates new project with given name.
   * As described in the backend documentation after project creation
   * token refreshing is required so this function does refresh token in middle of the process.
   */
  @BackendAPI.api('Project', 'Create')
  public create(name: string, env: Object = {}): Observable<Project> {
    return this.http.post('/api/v1/projects', { name, env }).pipe(map(
      (p: any) => {
        return new Project(p);
      }), tap(() => {}, () => {}, // token refreshing when observer completes
        () => {
          this.authService.refreshToken().subscribe((u) => u);
        }
      ),
    );
  }

  /**
   * list lists projects of authentication user.
   */
  @BackendAPI.api('Project', 'List')
  public list(): Observable<Project[]> {
    return this.http.get('/api/v1/projects').pipe(map(
      (ps: any[]) => {
        const projects: Project[] = [];
        for (const p of ps) {
          projects.push(new Project(p));
        }
        return projects;
      })
    );
  }

  /**
   * show shows detail about given project identification.
   */
  @BackendAPI.api('Project', 'Show')
  public show(id: string): Observable<Project> {
    return this.http.get(`/api/v1/projects/${id}`).pipe(map(
      (p: any) => {
        const project: Project = new Project(p);
        return project;
      }
    ));
  }

  /**
   * remove removes given project.
   */
  @BackendAPI.api('Project', 'Remove')
  public remove(id: string): Observable<Project> {
    return this.http.delete(`/api/v1/projects/${id}`).pipe(map(
      (p: any) => {
        return new Project(p);
      }), tap(() => {}, () => {}, // token refreshing when observer completes
        () => {
          this.authService.refreshToken().subscribe((u) => u);
        }
      ),
    );
  }
}
