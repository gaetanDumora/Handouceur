import {
  Action,
  ActionReducer,
  MetaReducer,
  State,
  createReducer,
  on,
} from '@ngrx/store';
import { User } from 'src/app/models/user';
import { authActions } from './auth.actions';
import { ErrorType } from 'src/app/models/error';

import { localStorageSync } from 'ngrx-store-localstorage';

export const AUTH_FEATURE_KEY = 'authState';

export interface AppState {
  appName: string;
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export interface AuthState {
  user: User | null;
  errorMessage: ErrorType;
}

export const initialState: AppState = {
  appName: 'Handouceur',
  [AUTH_FEATURE_KEY]: {
    user: null,
    errorMessage: null,
  },
};

// MetaReducer Functions
const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({
    keys: [AUTH_FEATURE_KEY],
    rehydrate: true,
  })(reducer);
};

const log = (reducer: ActionReducer<any>) => {
  return (state: State<AppState>, action: Action) => {
    const currentState = reducer(state, action);
    console.log('Previous state: ', state);
    console.log('Action: ', action);
    console.log('Next state: ', currentState);
    return currentState;
  };
};

export const metaReducers: MetaReducer[] = [log, localStorageSyncReducer];

export const authReducer = createReducer(
  initialState,
  on(authActions.submitCredentials, (state: AppState) => {
    return {
      ...state,
    };
  }),
  on(authActions.submitCredentailsSuccess, (state: AppState, { user }) => {
    return {
      ...state,
      [AUTH_FEATURE_KEY]: {
        user,
        errorMessage: null,
      },
    };
  }),
  on(
    authActions.submitCredentailsFaillure,
    (state: AppState, { errorMessage }) => {
      return {
        ...state,
        [AUTH_FEATURE_KEY]: {
          user: state[AUTH_FEATURE_KEY].user,
          errorMessage,
        },
      };
    }
  ),
  on(authActions.logoutUser, (state: AppState) => {
    return {
      ...state,
      [AUTH_FEATURE_KEY]: {
        user: null,
        errorMessage: state[AUTH_FEATURE_KEY].errorMessage,
      },
    };
  })
);
