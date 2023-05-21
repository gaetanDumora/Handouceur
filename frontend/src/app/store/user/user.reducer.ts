import {
  Action,
  ActionReducer,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { USER_ACTIONS } from './user.actions';

import { localStorageSync } from 'ngrx-store-localstorage';
import { USER_FEATURE_KEY, UserState, initialState } from './state';

// MetaReducer Functions
const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({
    keys: [USER_FEATURE_KEY],
    rehydrate: true,
  })(reducer);
};

export const userMetareducer: MetaReducer = localStorageSyncReducer;

export const userReducer = createReducer<UserState, Action>(
  initialState,
  on(USER_ACTIONS.submitCredentials, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(USER_ACTIONS.submitCredentialsSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      error: null,
      isLoading: false,
    };
  }),
  on(USER_ACTIONS.submitCredentialsFaillure, (state, { error }) => {
    return {
      ...state,
      user: state.user,
      error,
      isLoading: false,
    };
  }),
  on(USER_ACTIONS.logoutUser, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);
