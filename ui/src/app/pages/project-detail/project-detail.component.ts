import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Project } from '../../shared/project.model';
import { Thing } from '../../shared/thing.model';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  private project$: Observable<Project>;
  private things$: Observable<Thing[]>;

  constructor(
    private bService: BackendService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.bService.projectsShow(params.get('id')))
    );
    this.things$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.bService.projectsThings(params.get('id')))
    );
  }

}
