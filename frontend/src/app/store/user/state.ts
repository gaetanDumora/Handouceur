import { ErrorType } from 'src/app/types/error';
import { User } from 'src/app/types/user';

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
