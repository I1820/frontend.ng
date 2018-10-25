import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})

export class RegisterComponent {
  constructor(private app: AppComponent, private router: Router, private authService: AuthenticationService) {
      app.setPageSettings({
        pageEmpty: true,
        pageBodyWhite: true
      });
  }

  formSubmit(f: NgForm) {
    this.authService.signup(f.value.username)
    // this.router.navigate(['dashboard']);
  }
}
