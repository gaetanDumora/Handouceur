import { Action, createReducer, on } from '@ngrx/store';
import { JOURNEY_ACTIONS } from './journey.actions';
import { JourneyState, journeyState } from './state';

export const journeyReducer = createReducer<JourneyState, Action>(
  journeyState,
  on(JOURNEY_ACTIONS.loadAllJourneySuccess, (state, { journeys }) => {
    return {
      ...state,
      journeys,
    };
  }),
  on(JOURNEY_ACTIONS.loadAllJourneyFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);
