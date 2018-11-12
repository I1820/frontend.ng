import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-new-page',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
  }


}
