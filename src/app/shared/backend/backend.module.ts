import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { LoggerInterceptor } from './logger';

/**
 * BackendModule sends and receives requests with I1820 backend component.
 * Authentication handles by ngx-auth module and content type header is added by I1820 frontend proxy.
 * Each function in this service handles errors to show them in logs and with toasts but it throw them too so
 * caller can handle them again.
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ]
})
export class BackendModule { }
