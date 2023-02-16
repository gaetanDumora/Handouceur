import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROOT_FEATURE_KEY, RootState } from './state';

const selectRoot = createFeatureSelector<RootState>(ROOT_FEATURE_KEY);

export const getUser = createSelector(
  selectRoot,
  (state: RootState) => state.user
);

export const getAdminStatus = createSelector(
  selectRoot,
  (state) => state.user?.admin
);

export const getError = createSelector(selectRoot, (state) => state.error);
