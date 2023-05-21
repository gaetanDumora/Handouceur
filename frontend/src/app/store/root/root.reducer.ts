import {
  Action,
  ActionReducer,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { ROOT_ACTIONS } from './root.actions';

import { localStorageSync } from 'ngrx-store-localstorage';
import { ROOT_FEATURE_KEY, RootState, initialState } from './state';

// MetaReducer Functions
const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({
    keys: [ROOT_FEATURE_KEY],
    rehydrate: true,
  })(reducer);
};

export const rootMetareducer: MetaReducer = localStorageSyncReducer;

export const rootReducer = createReducer<RootState, Action>(
  initialState,
  on(ROOT_ACTIONS.setDarkTheme, (state, { isDarkTheme }) => {
    return {
      ...state,
      isDarkTheme,
    };
  })
);
