import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'login',
    templateUrl: './login.html'
})

export class LoginPage {
  constructor(private app: AppComponent, private router: Router) {
      app.setPageSettings({
        pageEmpty: true,
        pageBodyWhite: true
      });
  }

  formSubmit(f: NgForm) {
    console.log(f.value)
    // this.router.navigate(['dashboard']);
  }
}
