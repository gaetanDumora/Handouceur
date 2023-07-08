import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { USER_ACTIONS } from '../store/user/user.actions';

const tokenInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const { user } = JSON.parse(localStorage.getItem('user') as string);
  if (user) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
    );
  }
  return next(req);
};

const errorInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const store = inject(Store);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        store.dispatch(USER_ACTIONS.logoutUser());
        router.navigate(['login']);
      }

      return throwError(() => error);
    })
  );
};

export const httpInterceptors = [tokenInterceptor, errorInterceptor];
