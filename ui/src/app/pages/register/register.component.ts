import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
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
  public get submitButtonText(): string {
    if (this.loading) {
      return `<i class="fas fa-spinner fa-spin"></i>`;
    } else {
      return 'Sign Up';
    }
  }

  public modelValidationStatusClass(m: NgModel): string {
    if (m.invalid && (m.dirty || m.touched)) {
      return 'is-invalid';
    }
    return ''
  }

  public formSubmit(f: NgForm) {
    this.loading = true;
    this.authService.signup(f.value).subscribe(() => {
      this.loading = false;
      console.log('register')
    }, (err) => {
      this.loading = false;
      console.log(err)
    })
    // this.router.navigate(['dashboard']);
  }
}
