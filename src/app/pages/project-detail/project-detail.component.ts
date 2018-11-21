import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Project, Thing, ProjectService, ThingService } from '../../shared/backend';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  private project$: Observable<Project>;
  private things$: Observable<Thing[]>;

  constructor(
    private pService: ProjectService,
    private tService: ThingService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.pService.show(params.get('id')))
    );
    this.refresh();
  }

  public refresh(): void {
    this.things$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.tService.list(params.get('id')))
    );
  }

}
