import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

export class RegisterComponent {
  /**
   * loading is true when client tries to communicate with server in registration process otherwise false
   */
  public loading: boolean;

  /**
   * Today
   */
  public today: Date = new Date();

  constructor(
    private app: AppComponent,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loading = false;
    this.app.setPageSettings({
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

  /**
   * formSubmits calls when user submits the registration form.
   */
  public formSubmit(f: FormGroup): void {
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
