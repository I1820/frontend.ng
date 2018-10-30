import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BackendService } from '../../shared/backend.service';
import { Project } from '../../shared/project.model';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  private projects$: Observable<Project[]>;

  constructor(
    private bService: BackendService,
  ) { }

  ngOnInit() {
    this.projects$ = this.bService.projectsList();
  }

  private refresh(): void {
    this.projects$ = this.bService.projectsList();
  }
}
