import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { NotificationsService} from 'angular2-notifications';

import { BackendModule } from './backend.module';

/**
 * BackendError represents errors from backend proxy that is based on hapi.js.
 */
interface BackendError {
  error: string;
  message: string;
  statusCode: number;
}

/**
 * BackendAPI is a factory for api decorators.
 */
@Injectable({
  providedIn: BackendModule,
})
export class BackendAPI {
  private static logger: NGXLogger;
  private static notifService: NotificationsService;

  constructor(
    logger: NGXLogger,
    notifService: NotificationsService,
  ) {
    BackendAPI.logger = logger;
    BackendAPI.notifService = notifService;
  }

  /**
   * errorLogger logs every error on backend communication
   */
  private static errorLogger(service: string, api: string, error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      BackendAPI.logger.error('An error occurred:', error.error.message);
      BackendAPI.notifService.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      const err = <BackendError> error.error;
      BackendAPI.logger.error(`${service} API:`, api, `${err.statusCode}: ${err.message}`);
      BackendAPI.notifService.error(`${service}: ${api}`, `${err.statusCode}: ${err.message}`);
    }
  }

  /**
   * api decorates api calls to add logging and error handling
   */
  public static api(service: string, api: string) {
    return function (_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<(...any) => Observable<any>>) {
      const method = descriptor.value;
      descriptor.value = function () {
        BackendAPI.logger.debug(`${service} Service:`, `${api} API is being called`);
        return method.apply(this, arguments).pipe(
          tap(
            (v: any) => BackendAPI.logger.info(`${service} Service`, api, v),
            (error) => BackendAPI.errorLogger(service, api, error),
          )
        );
      };
    };
  }
}
