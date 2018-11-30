import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

/**
 * LoggerInterceptor logs status and duration of each http request.
 */
@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  constructor(
    private logger: NGXLogger,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    return next.handle(req).pipe(
      tap(
        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        error => ok = `failed (${error})`,
      ),
      finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          this.logger.debug(msg);
       })
    );
  }
}


