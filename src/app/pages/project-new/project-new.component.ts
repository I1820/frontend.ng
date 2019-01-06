import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

import { ProjectService } from '../../shared/backend';

@Component({
  selector: 'app-project-new-page',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {

  public loading: boolean;
  @ViewChild('completeSwal') private completeSwal: SwalComponent;

  constructor(
    private pService: ProjectService,
    public router: Router,
  ) {
    this.loading = false;
  }

  ngOnInit() {
  }

  /**
   * submitButtonText specifies submit button inner html.
   * when someone click on submit button form status changes to loading
   * and submit button will shows a spinner.
   */
  public get submitButtonText(): string {
    if (this.loading) {
      return `<i class="fas fa-spinner fa-spin"></i>`;
    } else {
      return 'Build';
    }
  }

  /**
   * formSubmits calls when user submits the project creation form.
   * Please consider that after project creation there must be an waiting time to refresh the user token.
   */
  public formSubmit(f: FormGroup): void {
    this.loading = true;
    this.pService.create(f.value.name).subscribe(() => {
      this.loading = false;
      this.completeSwal.show();
    }, () => {
      this.loading = false;
    });
  }
}
