import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { authActions } from './auth.actions';
import { mergeMap, map, of, catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  submitCredentails = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.submitCredentials),
      mergeMap((credentials) => {
        return this.authService.login(credentials).pipe(
          map((user: any) => authActions.submitCredentailsSuccess({ user })),
          catchError(({ error }) =>
            of(
              authActions.submitCredentailsFaillure({
                errorMessage: error.message,
              })
            )
          )
        );
      })
    )
  );

  logoutUser = createEffect(
    () =>
      this.actions.pipe(
        ofType(authActions.logoutUser),
        map(() => authActions.logoutUser())
      ),
    { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}
}
