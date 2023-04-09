import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ROOT_ACTIONS } from './root.actions';
import { map, of, catchError, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { ThemeService } from '../shared/services/theme.service';

@Injectable({
  providedIn: 'root',
})
export class RootEffect {
  submitCredentials = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_ACTIONS.submitCredentials),
      switchMap(({ email, firstName, lastName, password }) => {
        return this.authService
          .registerUser({ email, firstName, lastName, password })
          .pipe(
            map(() => ROOT_ACTIONS.submitCredentialsSuccess({ user: null })),
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

  loginUser = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_ACTIONS.loginUser),
      switchMap((credentials) => {
        return this.authService.login(credentials).pipe(
          map((user) => ROOT_ACTIONS.submitCredentialsSuccess({ user })),
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

  setDarkMode = createEffect(
    () =>
      this.actions.pipe(
        ofType(ROOT_ACTIONS.setDarkTheme),
        switchMap(({ isDarkTheme }) => {
          return this.themeService
            .setDarkTheme(isDarkTheme)
            .pipe(
              map((value) => ROOT_ACTIONS.setDarkTheme({ isDarkTheme: value }))
            );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}
}
