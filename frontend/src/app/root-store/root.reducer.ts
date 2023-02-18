import {
  Action,
  ActionReducer,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { ROOT_ACTIONS } from './root.actions';

import { localStorageSync } from 'ngrx-store-localstorage';
import { ROOT_FEATURE_KEY, RootState, State, initialState } from './state';

// MetaReducer Functions
const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({
    keys: [ROOT_FEATURE_KEY],
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

export const rootReducer = createReducer<RootState, Action>(
  initialState,
  on(ROOT_ACTIONS.submitCredentials, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ROOT_ACTIONS.submitCredentialsSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      error: null,
      isLoading: false,
    };
  }),
  on(ROOT_ACTIONS.submitCredentialsFaillure, (state, { error }) => {
    return {
      ...state,
      user: state.user,
      error,
      isLoading: false,
    };
  }),
  on(ROOT_ACTIONS.logoutUser, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(ROOT_ACTIONS.setDarkTheme, (state, { isDarkTheme }) => {
    return {
      ...state,
      isDarkTheme,
    };
  })
);
