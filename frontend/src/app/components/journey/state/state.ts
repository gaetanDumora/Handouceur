import { ErrorType } from 'src/app/models/error';
import { Journey } from 'src/app/models/journeys';

export const JOURNEY_FEATURE_KEY = 'journeys';

export interface State {
  readonly [JOURNEY_FEATURE_KEY]: JourneyState;
}

export interface JourneyState {
  isLoading: boolean;
  error: ErrorType;
  journeys: Journey[] | [];
  selectedJourney: Journey | null;
}

export const journeyState: JourneyState = {
  isLoading: false,
  error: null,
  journeys: [],
  selectedJourney: null,
};
