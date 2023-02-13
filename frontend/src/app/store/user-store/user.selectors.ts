import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, USER_FEATURE_KEY } from './state';

const selectUserStore = createFeatureSelector<State>(USER_FEATURE_KEY);

export const getUser = createSelector(
  selectUserStore,
  (state) => state[USER_FEATURE_KEY].user
);

export const getAdminStatus = createSelector(
  selectUserStore,
  (state) => state[USER_FEATURE_KEY].user?.admin
);

export const getError = createSelector(
  selectUserStore,
  (state) => state[USER_FEATURE_KEY].errorMessage
);
