import { Action, createReducer, on } from '@ngrx/store';
import { JOURNEY_ACTIONS } from './journey.actions';
import { JourneyState, journeyState } from './state';

export const journeyReducer = createReducer<JourneyState, Action>(
  journeyState,
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

  on(JOURNEY_ACTIONS.upsertJourney, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.upsertJourneySuccess, (state, { journey }) => {
    const updatedJourneys = state.journeys.map((existing) =>
      existing.id === journey.id ? journey : existing
    );
    return {
      ...state,
      journeys: updatedJourneys,
      isLoading: false,
    };
  }),
  on(JOURNEY_ACTIONS.upsertJourneyFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
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
  on(JOURNEY_ACTIONS.uploadImages, (state, { images }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(JOURNEY_ACTIONS.uploadImagesSuccess, (state, { status }) => {
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
  })
);
