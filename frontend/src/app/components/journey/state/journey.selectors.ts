import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JOURNEY_FEATURE_KEY, JourneyState } from './state';

const selectJoureyFeature =
  createFeatureSelector<JourneyState>(JOURNEY_FEATURE_KEY);

export const getAllJourney = createSelector(
  selectJoureyFeature,
  (state) => state.journeys
);

export const getSelectedJourney = createSelector(
  selectJoureyFeature,
  (state) => state.selectedJourney
);

export const isLoading = createSelector(
  selectJoureyFeature,
  (state) => state.isLoading
);
