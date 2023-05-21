import { ErrorType } from 'src/app/models/error';
import { User } from 'src/app/models/user';

export const USER_FEATURE_KEY = 'user';

export interface State {
  readonly [USER_FEATURE_KEY]: UserState;
}

export interface UserState {
  isLoading: boolean;
  error: ErrorType;
  user: User | null;
}

export const initialState: UserState = {
  isLoading: false,
  error: null,
  user: null,
};
