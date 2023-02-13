import { ErrorType } from 'src/app/models/error';
import { User } from 'src/app/models/user';

export const USER_FEATURE_KEY = 'userState';

export interface State {
  appName: string;
  isLoading: boolean;
  error: ErrorType;
  readonly [USER_FEATURE_KEY]: UserState;
}

export interface UserState {
  user: User | null;
  errorMessage: ErrorType;
}

export const initialState: State = {
  appName: 'Handouceur',
  isLoading: false,
  error: null,
  [USER_FEATURE_KEY]: {
    user: null,
    errorMessage: null,
  },
};
