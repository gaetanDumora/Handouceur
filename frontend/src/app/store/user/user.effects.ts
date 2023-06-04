import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { USER_ACTIONS } from './user.actions';
import { map, of, catchError, switchMap } from 'rxjs';
import { AuthService } from 'src/app/store/user/user.service';

@Injectable()
export class UserEffects {
  submitCredentials = createEffect(() =>
    this.actions.pipe(
      ofType(USER_ACTIONS.submitCredentials),
      switchMap(({ email, firstName, lastName, password }) => {
        return this.authService
          .registerUser({ email, firstName, lastName, password })
          .pipe(
            map(() => USER_ACTIONS.submitCredentialsSuccess({ user: null })),
            catchError(({ error }) =>
              of(
                USER_ACTIONS.submitCredentialsFaillure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );

  loginUser = createEffect(() =>
    this.actions.pipe(
      ofType(USER_ACTIONS.loginUser),
      switchMap((credentials) => {
        return this.authService.login(credentials).pipe(
          map((user) => USER_ACTIONS.submitCredentialsSuccess({ user })),
          catchError(({ error }) =>
            of(
              USER_ACTIONS.submitCredentialsFaillure({
                error: error.message,
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
        ofType(USER_ACTIONS.logoutUser),
        map(() => USER_ACTIONS.logoutUser())
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions, private authService: AuthService) {}
}
