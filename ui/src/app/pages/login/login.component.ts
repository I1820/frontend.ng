import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html'
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
   * formSubmits calls when user submit the login form.
   */
  private formSubmit(f: NgForm): void {
    this.authService.login(f.value.username, f.value.password).subscribe(() => {
      this.loading = false;
      console.log('login');
      this.router.navigate(['dashboard']);
    }, (err) => {
      this.loading = false;
      console.log(err);
    });
  }
}
