import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-project-new-page',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {

  private loading: boolean;

  constructor(
    private bService: BackendService,
    private router: Router,
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
  private get submitButtonText(): string {
    if (this.loading) {
      return `<i class="fas fa-spinner fa-spin"></i>`;
    } else {
      return 'Build';
    }
  }

  /**
   * When input is invalid in the input box, input box must truns to red this function
   * returns true to trigger invalid class when input is invalid. use this with [class.is-invalid].
   */
  private isValid(m: FormControl): boolean {
    return m.invalid && (m.dirty || m.touched);
  }

  /**
   * formSubmits calls when user submits the project creation form.
   */
  private formSubmit(f: FormGroup): void {
    this.loading = true;
    this.bService.projectsNew(f.value.name).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/projects']);
    }, (err) => {
      this.loading = false;
    });

  }


}
