import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { ErrorType } from 'src/app/models/error';
import { User, Credentials } from 'src/app/models/user';

export enum ActionTypes {
  SUBMIT_CREDENTIALS = 'Submit Credentials',
  SUBMIT_CREDENTIALS_SUCCESS = 'Submit Credentials success',
  SUBMIT_CREDENTIALS_FAILURE = 'Submit Credentials faillure',
  LOGOUT_USER = 'Logout User',
}

export const USER_ACTIONS = createActionGroup({
  source: 'User',
  events: {
    [ActionTypes.SUBMIT_CREDENTIALS]: props<Credentials>(),
    [ActionTypes.SUBMIT_CREDENTIALS_SUCCESS]: props<{ user: User }>(),
    [ActionTypes.SUBMIT_CREDENTIALS_FAILURE]: props<{
      errorMessage: ErrorType;
    }>(),
    [ActionTypes.LOGOUT_USER]: emptyProps(),
  },
});
