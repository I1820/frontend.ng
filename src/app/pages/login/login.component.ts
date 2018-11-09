import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';
import { NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent {
  /**
   * loading is true when client tries to communicate with server in login process otherwise false
   */
  private loading: boolean;


  constructor(
    private app: AppComponent,
    private router: Router,
    private authService: AuthenticationService,
    private notifService: NotificationsService,
  ) {
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
      return 'Sign me in';
    }
  }

  /**
   * When input is invalid in the input box, input box must truns to red this function
   * returns true to trigger invalid class when input is invalid. use this with [class.is-invalid].
   */
  private isValid(m: NgModel): boolean {
    return m.invalid && (m.dirty || m.touched);
  }

  /**
   * formSubmits calls when user submit the login form.
   */
  private formSubmit(f: NgForm): void {
    this.authService.login(f.value.username, f.value.password).subscribe(() => {
      this.loading = false;
      console.log('login');
      this.router.navigate(['dashboard']);
    }, (err) => {
      this.loading = false;
      this.notifService.error('Login Failed', `${err.error.statusCode}: ${err.error.message}`);
    });
  }
}
