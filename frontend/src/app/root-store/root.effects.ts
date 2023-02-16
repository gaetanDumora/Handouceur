import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ROOT_ACTIONS } from './root.actions';
import { mergeMap, map, of, catchError } from 'rxjs';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RootEffect {
  submitCredentails = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_ACTIONS.submitCredentials),
      mergeMap((credentials) => {
        return this.authService.login(credentials).pipe(
          map((user: any) => ROOT_ACTIONS.submitCredentialsSuccess({ user })),
          catchError(({ error }) =>
            of(
              ROOT_ACTIONS.submitCredentialsFaillure({
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
        ofType(ROOT_ACTIONS.logoutUser),
        map(() => ROOT_ACTIONS.logoutUser())
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions, private authService: AuthService) {}
}
