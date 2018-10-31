import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-thing-new',
  templateUrl: './thing-new.component.html',
  styleUrls: ['./thing-new.component.css']
})
export class ThingNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * When input is invalid in the input box, input box must truns to red this function
   * returns invalid class when input is invalid. use this with [ngClass].
   */
  private modelValidationStatusClass(m: NgModel): string {
    if (m.invalid && (m.dirty || m.touched)) {
      return 'is-invalid';
    }
    return '';
  }

  /**
   * formSubmits calls when user submit the registration form.
   */
  private formSubmit(f: NgForm): void {
  }


}
