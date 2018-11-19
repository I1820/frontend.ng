import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { LoggerInterceptor } from './logger';

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
