import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { ErrorType } from 'src/app/models/error';
import { User, Credentials } from 'src/app/models/user';

export const authActions = createActionGroup({
  source: 'AUTH',
  events: {
    'submit credentials': props<Credentials>(),
    'submit credentails success': props<{ user: User }>(),
    'submit credentails faillure': props<{ errorMessage: ErrorType }>(),
    'logout user': emptyProps(),
  },
});
