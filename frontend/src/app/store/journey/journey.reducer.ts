import { Action, createReducer, on } from '@ngrx/store';
import { JOURNEY_ACTIONS } from './journey.actions';
import { JourneyState, journeyState } from './state';

export const journeyReducer = createReducer<JourneyState, Action>(
  journeyState,
  // Get all Journeys
  on(JOURNEY_ACTIONS.loadAllJourney, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.loadAllJourneySuccess, (state, { journeys }) => {
    return {
      ...state,
      journeys,
      isLoading: false,
    };
  }),
  on(JOURNEY_ACTIONS.loadAllJourneyFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  // Post Journey
  on(JOURNEY_ACTIONS.upsertJourney, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.upsertJourneySuccess, (state, { journey }) => {
    const exist = state.journeys.some(({ id }) => journey.id === id);
    const journeys = exist
      ? state.journeys.map((existing) =>
          existing.id === journey.id ? journey : existing
        )
      : [...state.journeys, journey];
    return {
      ...state,
      journeys,
      selectedJourney: journey,
      isLoading: false,
    };
  }),
  on(JOURNEY_ACTIONS.upsertJourneyFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  // Delete Journey
  on(JOURNEY_ACTIONS.deleteJourney, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.deleteJourneySuccess, (state, { id: toDelete }) => {
    const journeys = state.journeys.filter(({ id }) => id !== toDelete);
    return {
      ...state,
      journeys,
      selectedJourney: null,
      isLoading: false,
    };
  }),
  on(JOURNEY_ACTIONS.upsertJourneyFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  // Selected Journey
  on(JOURNEY_ACTIONS.loadSelectedJourney, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.loadSelectedJourneySuccess, (state, { journey }) => {
    return {
      ...state,
      selectedJourney: journey,
      isLoading: false,
    };
  }),
  on(JOURNEY_ACTIONS.loadSelectedJourneyFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  // Upload images
  on(JOURNEY_ACTIONS.uploadImages, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.uploadImagesSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(JOURNEY_ACTIONS.uploadImagesFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  // Download images
  on(JOURNEY_ACTIONS.downloadImage, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.downloadImageSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(JOURNEY_ACTIONS.downloadImageFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  // Delete images
  on(JOURNEY_ACTIONS.deleteImages, (state) => {
    return {
      ...state,
    };
  }),
  on(JOURNEY_ACTIONS.deleteImagesSuccess, (state) => {
    return {
      ...state,
    };
  }),
  on(JOURNEY_ACTIONS.deleteImagesFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);
