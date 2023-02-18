import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { ErrorType } from 'src/app/models/error';
import { User, Credentials } from 'src/app/models/user';

export enum ActionTypes {
  SUBMIT_CREDENTIALS = 'Submit Credentials',
  SUBMIT_CREDENTIALS_SUCCESS = 'Submit Credentials success',
  SUBMIT_CREDENTIALS_FAILURE = 'Submit Credentials faillure',
  LOGOUT_USER = 'Logout User',
  DARK_THEME = 'Set Dark Theme',
}

export const ROOT_ACTIONS = createActionGroup({
  source: 'Root',
  events: {
    [ActionTypes.DARK_THEME]: props<{ isDarkTheme: boolean }>(),
    [ActionTypes.SUBMIT_CREDENTIALS]: props<Credentials>(),
    [ActionTypes.SUBMIT_CREDENTIALS_SUCCESS]: props<{ user: User }>(),
    [ActionTypes.SUBMIT_CREDENTIALS_FAILURE]: props<{
      error: ErrorType;
    }>(),
    [ActionTypes.LOGOUT_USER]: emptyProps(),
  },
});
