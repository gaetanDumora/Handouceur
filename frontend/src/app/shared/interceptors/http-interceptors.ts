import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass request with token if provided, through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { user } = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
      return next.handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
      );
    }
    return next.handle(req);
  }
}
