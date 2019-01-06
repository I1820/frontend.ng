import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

import { ProjectService, Project } from '../../shared/backend';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects$: Observable<Project[]>;
  @ViewChild('completeSwal') private completeSwal: SwalComponent;

  constructor(
    private pService: ProjectService,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  public refresh(): void {
    this.projects$ = this.pService.list();
  }

  public projectRemove(pid: string) {
    this.pService.remove(pid).subscribe(() => {
      this.completeSwal.show();
    });
  }
}
