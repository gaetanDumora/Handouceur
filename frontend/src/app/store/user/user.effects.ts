import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { USER_ACTIONS } from './user.actions';
import { map, of, catchError, switchMap } from 'rxjs';
import { AwsService } from 'src/app/shared/aws.service';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  submitCredentials = createEffect(() =>
    this.actions.pipe(
      ofType(USER_ACTIONS.submitCredentials),
      switchMap(({ email, firstName, lastName, password, address, avatar }) => {
        return this.userService
          .registerUser({
            email,
            firstName,
            lastName,
            password,
            address,
            avatar,
          })
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
        return this.userService.login(credentials).pipe(
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

  uploadImages = createEffect(() =>
    this.actions.pipe(
      ofType(USER_ACTIONS.uploadImages),
      switchMap(({ image }) => {
        return this.awsService.uploadFiles(image).pipe(
          map(() => USER_ACTIONS.uploadImagesSuccess()),
          catchError(({ error }) =>
            of(USER_ACTIONS.uploadImagesFailure({ error: error.message }))
          )
        );
      })
    )
  );
  constructor(
    private actions: Actions,
    private userService: UserService,
    private awsService: AwsService
  ) {}
}
