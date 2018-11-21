import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectService, Project } from '../../shared/backend';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  private projects$: Observable<Project[]>;

  constructor(
    private pService: ProjectService,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  public refresh(): void {
    this.projects$ = this.pService.list();
  }
}
