import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState } from './state';

const selectUser = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const getUser = createSelector(selectUser, (state) => state.user);

export const getToken = createSelector(
  selectUser,
  (state) => state.user?.accessToken
);

export const getAdminStatus = createSelector(
  selectUser,
  (state) => state.user?.admin
);

export const getError = createSelector(selectUser, (state) => state.error);

export const isLoading = createSelector(selectUser, (state) => state.isLoading);
