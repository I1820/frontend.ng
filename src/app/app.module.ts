// Core Modules
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GravatarModule } from 'ngx-gravatar';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TimeagoModule } from 'ngx-timeago';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// Global Configurations
import * as global from './globals';

// Main Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule, BackendModule } from './shared';

// Page Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ThingNewComponent } from './pages/thing-new/thing-new.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { ProjectNewComponent } from './pages/project-new/project-new.component';
import { ThingDetailComponent } from './pages/thing-detail/thing-detail.component';
import { AssetNewComponent } from './modals/asset-new/asset-new.component';

@NgModule({
  declarations: [
    // sections
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,
    SidePanelComponent,

    // modals
    AssetNewComponent,

    // pages
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ThingNewComponent,
    ProfileComponent,
    WeatherComponent,
    ProjectNewComponent,
    ThingDetailComponent,
  ],
  entryComponents: [
    // modals
    AssetNewComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AuthenticationModule,
    BackendModule,
    NgbModule,
    GravatarModule,
    LeafletModule.forRoot(),
    TimeagoModule.forRoot(),
    SimpleNotificationsModule.forRoot({
      timeOut: 3000,
    }),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
  ],
  providers: [
    Title,
    { provide: 'MAPBOX_KEY', useValue: 'pk.eyJ1IjoiMTk5NXBhcmhhbSIsImEiOiJjam55NWZlNTQwMDR3M3FscmpkdDBtaHBuIn0.V5NpoZd79sLCj2M_9Rccrg' },
  ],
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
