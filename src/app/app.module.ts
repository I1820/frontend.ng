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
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { MonacoEditorModule } from 'ngx-monaco-editor';

// Main Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AuthenticationModule, BackendModule } from './shared';

// Page and Modal Components
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
import { ConnectivityNewComponent } from './modals/connectivity-new/connectivity-new.component';
import { ThingChartComponent } from './pages/thing-chart/thing-chart.component';
import { AssetDataComponent } from './modals/asset-data/asset-data.component';
import { WidgetNewComponent } from './modals/widget-new/widget-new.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { GaugeComponent } from './widgets/gauge/gauge.component';
import { ChartComponent } from './widgets/chart/chart.component';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

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
    ConnectivityNewComponent,
    AssetDataComponent,
    WidgetNewComponent,

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
    ThingChartComponent,
    WidgetComponent,
    GaugeComponent,
    ChartComponent,
  ],
  entryComponents: [
    // modals
    AssetNewComponent,
    ConnectivityNewComponent,
    AssetDataComponent,
    WidgetNewComponent,
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
    LoadingBarHttpClientModule,
    NgSelectModule,
    ChartModule,
    MonacoEditorModule.forRoot(),
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
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor() {}
}
