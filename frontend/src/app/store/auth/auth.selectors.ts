import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, AUTH_FEATURE_KEY } from './auth.reducer';

const selectAuthStore = createFeatureSelector<AppState>(AUTH_FEATURE_KEY);

export const getUser = createSelector(
  selectAuthStore,
  (state) => state[AUTH_FEATURE_KEY].user
);

export const getAdminStatus = createSelector(
  selectAuthStore,
  (state) => state[AUTH_FEATURE_KEY].user?.admin
);

export const getError = createSelector(
  selectAuthStore,
  (state) => state[AUTH_FEATURE_KEY].errorMessage
);
