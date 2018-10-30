import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

// User Login / Register Pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// Dashboard Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { // by default client is redirected to login page.
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ PublicGuard ],
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ PublicGuard ],
    data: { title: 'Register' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ ProtectedGuard ],
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
