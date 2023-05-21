import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROOT_FEATURE_KEY, RootState } from './state';

const selectRoot = createFeatureSelector<RootState>(ROOT_FEATURE_KEY);

export const getError = createSelector(selectRoot, (state) => state.error);

export const isDarkTheme = createSelector(
  selectRoot,
  (state) => state.isDarkTheme
);

export const isLoading = createSelector(selectRoot, (state) => state.isLoading);
