import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
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
  public loading: boolean;

  /**
   * Platform creation date
   */
  public creationDate: Date = new Date('2015');

  /**
   * Today
   */
  public today: Date = new Date();

  constructor(
    private app: AppComponent,
    private router: Router,
    private authService: AuthenticationService,
    private notifService: NotificationsService,
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
      return 'Sign me in';
    }
  }

  /**
   * formSubmits calls when user submits the login form.
   */
  public formSubmit(f: FormGroup): void {
    this.loading = true;
    this.authService.login(f.value.username, f.value.password, f.value.remember === true ? true : false).subscribe(() => {
      this.loading = false;
      this.router.navigate(['dashboard']);
    }, (err) => {
      this.loading = false;
      this.notifService.error('Login Failed', `${err.error.statusCode}: ${err.error.message}`);
    });
  }
}
