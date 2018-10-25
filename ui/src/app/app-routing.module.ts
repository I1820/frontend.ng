import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// User Login / Register
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';

const routes: Routes = [
  { // by default client is redirected to login page.
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterPage,
    data: { title: 'Register' }
  },
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
