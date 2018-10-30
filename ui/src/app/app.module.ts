// Core Modules
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule, BackendService } from './shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GravatarModule } from 'ngx-gravatar';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// Global Configurations
import * as global from './globals';

// Main Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

// Page Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,

    // pages
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ProjectsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule,
    NgbModule,
    GravatarModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
  ],
  providers: [ Title, BackendService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) { // set page tite based on `title` data of current route
        const title = 'I1820 | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
