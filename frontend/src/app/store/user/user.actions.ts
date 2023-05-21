import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { ErrorType } from 'src/app/models/error';
import { User, Credentials, RegisterInputs } from 'src/app/models/user';

export enum ActionTypes {
  USER_SUBMIT_CREDENTIALS = 'Submit Credentials',
  USER_SUBMIT_CREDENTIALS_SUCCESS = 'Submit Credentials success',
  USER_SUBMIT_CREDENTIALS_FAILURE = 'Submit Credentials faillure',
  USER_LOGOUT = 'Logout User',
  USER_LOGIN = 'Login User',
}

export const USER_ACTIONS = createActionGroup({
  source: 'User',
  events: {
    [ActionTypes.USER_SUBMIT_CREDENTIALS]: props<RegisterInputs>(),
    [ActionTypes.USER_SUBMIT_CREDENTIALS_SUCCESS]: props<{
      user: User | null;
    }>(),
    [ActionTypes.USER_SUBMIT_CREDENTIALS_FAILURE]: props<{
      error: ErrorType;
    }>(),
    [ActionTypes.USER_LOGOUT]: emptyProps(),
    [ActionTypes.USER_LOGIN]: props<Credentials>(),
  },
});
