import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  /**
   * loading is true when client tries to communicate with server in registration process otherwise false
   */
  private loading: boolean;

  constructor(private app: AppComponent, private router: Router, private authService: AuthenticationService) {
    this.loading = false;
    app.setPageSettings({
      pageEmpty: true,
      pageBodyWhite: true
    });
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
      return 'Sign Up';
    }
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
    this.loading = true;
    this.authService.signup(f.value).subscribe(() => {
      this.loading = false;
      console.log('register');
      this.router.navigate(['dashboard']);
    }, (err) => {
      this.loading = false;
      console.log(err);
    });
  }
}
