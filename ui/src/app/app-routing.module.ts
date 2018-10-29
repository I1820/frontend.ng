import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { CommonModule } from '@angular/common';

// User Login / Register
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { // by default client is redirected to login page.
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
