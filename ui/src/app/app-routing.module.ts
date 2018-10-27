import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { CommonModule } from '@angular/common';

// User Login / Register
import { LoginPage } from './pages/login/login';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardPage } from './pages/dashboard/dashboard';

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
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    data: { title: 'Dashboard' }
  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes, config) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
