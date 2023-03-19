import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Journey } from '../../../models/journeys';
import { ErrorType } from 'src/app/models/error';

export enum JourneyActionTypes {
  LOAD_SELECTED_JOURNEY = 'Load Selected Journey',
  LOAD_SELECTED_JOURNEY_SUCCESS = 'Load Selected Journey Success',
  LOAD_SELECTED_JOURNEY_FAILURE = 'Load Selected Journey Failure',

  LOAD_ALL_JOURNEY = 'Load All Journey',
  LOAD_ALL_JOURNEY_SUCCESS = 'Load All Journey Success',
  LOAD_ALL_JOURNEY_FAILURE = 'Load All Journey Failure',

  POST_JOURNEY = 'Post Journey',
  POST_JOURNEY_SUCCESS = 'Post Journey Success',
  POST_JOURNEY_FAILURE = 'Post Journey Failure',
}

export const JOURNEY_ACTIONS = createActionGroup({
  source: 'Journey',
  events: {
    [JourneyActionTypes.LOAD_SELECTED_JOURNEY]: props<{ id: number }>(),
    [JourneyActionTypes.LOAD_SELECTED_JOURNEY_SUCCESS]: props<{
      journey: Journey;
    }>(),
    [JourneyActionTypes.LOAD_SELECTED_JOURNEY_FAILURE]: props<{
      error: ErrorType;
    }>(),

    [JourneyActionTypes.LOAD_ALL_JOURNEY]: emptyProps(),
    [JourneyActionTypes.LOAD_ALL_JOURNEY_SUCCESS]: props<{
      journeys: Journey[];
    }>(),
    [JourneyActionTypes.LOAD_ALL_JOURNEY_FAILURE]: props<{
      error: ErrorType;
    }>(),

    [JourneyActionTypes.POST_JOURNEY]: props<{ journey: Partial<Journey> }>(),
  },
});
