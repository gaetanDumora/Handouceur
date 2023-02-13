import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { USER_ACTIONS } from './user.actions';
import { mergeMap, map, of, catchError } from 'rxjs';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserEffect {
  submitCredentails = createEffect(() =>
    this.actions.pipe(
      ofType(USER_ACTIONS.submitCredentials),
      mergeMap((credentials) => {
        return this.authService.login(credentials).pipe(
          map((user: any) => USER_ACTIONS.submitCredentialsSuccess({ user })),
          catchError(({ error }) =>
            of(
              USER_ACTIONS.submitCredentialsFaillure({
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
        ofType(USER_ACTIONS.logoutUser),
        map(() => USER_ACTIONS.logoutUser())
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions, private authService: AuthService) {}
}
