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
    const root = JSON.parse(localStorage.getItem('root') as string);
    if (root.user) {
      const {
        user: { accessToken },
      } = root;
      return next.handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      );
    }
    return next.handle(req);
  }
}
