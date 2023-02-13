import {
  Action,
  ActionReducer,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { USER_ACTIONS } from './user.actions';

import { localStorageSync } from 'ngrx-store-localstorage';
import { USER_FEATURE_KEY, State, initialState } from './state';

// MetaReducer Functions
const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({
    keys: [USER_FEATURE_KEY],
    rehydrate: true,
  })(reducer);
};

const log = (reducer: ActionReducer<any>) => {
  return (state: State, action: Action) => {
    const currentState = reducer(state, action);
    console.log('Previous state: ', state);
    console.log('Action: ', action);
    console.log('Next state: ', currentState);
    return currentState;
  };
};

export const metaReducers: MetaReducer[] = [log, localStorageSyncReducer];

export const userReducer = createReducer(
  initialState,
  on(USER_ACTIONS.submitCredentials, (state: State) => {
    return {
      ...state,
    };
  }),
  on(USER_ACTIONS.submitCredentialsSuccess, (state: State, { user }) => {
    return {
      ...state,
      [USER_FEATURE_KEY]: {
        user,
        errorMessage: null,
      },
    };
  }),
  on(
    USER_ACTIONS.submitCredentialsFaillure,
    (state: State, { errorMessage }) => {
      return {
        ...state,
        [USER_FEATURE_KEY]: {
          user: state[USER_FEATURE_KEY].user,
          errorMessage,
        },
      };
    }
  ),
  on(USER_ACTIONS.logoutUser, (state: State) => {
    return {
      ...state,
      [USER_FEATURE_KEY]: {
        user: null,
        errorMessage: state[USER_FEATURE_KEY].errorMessage,
      },
    };
  })
);
