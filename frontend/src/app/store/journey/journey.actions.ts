import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Journey } from '../../models/journeys';
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

  UPSERT_JOURNEY = 'Upsert Journey',
  UPSERT_JOURNEY_SUCCESS = 'Upsert Journey Success',
  UPSERT_JOURNEY_FAILURE = 'Upsert Journey Failure',

  DELETE_JOURNEY = 'Delete Journey',
  DELETE_JOURNEY_SUCCESS = 'Delete Journey Success',
  DELETE_JOURNEY_FAILURE = 'Delete Journey Failure',

  UPLOAD_IMAGES = 'Upload Images',
  UPLOAD_IMAGES_SUCCESS = 'Upload Images Success',
  UPLOAD_IMAGES_FAILURE = 'Upload Images Failure',

  DOWNLOAD_IMAGE = 'Download Image',
  DOWNLOAD_IMAGE_SUCCESS = 'Download Image Success',
  DOWNLOAD_IMAGE_FAILURE = 'Download Image Failure',

  DELETE_IMAGES = 'Delete Images',
  DELETE_IMAGES_SUCCESS = 'Delete Images Success',
  DELETE_IMAGES_FAILURE = 'Delete Images Failure',
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

    [JourneyActionTypes.UPSERT_JOURNEY]: props<{ journey: Partial<Journey> }>(),
    [JourneyActionTypes.UPSERT_JOURNEY_SUCCESS]: props<{ journey: Journey }>(),
    [JourneyActionTypes.UPSERT_JOURNEY_FAILURE]: props<{ error: ErrorType }>(),

    [JourneyActionTypes.DELETE_JOURNEY]: props<{ id: number }>(),
    [JourneyActionTypes.DELETE_JOURNEY_SUCCESS]: props<{ id: number }>(),
    [JourneyActionTypes.DELETE_JOURNEY_FAILURE]: props<{ error: ErrorType }>(),

    [JourneyActionTypes.UPLOAD_IMAGES]: props<{ images: FormData }>(),
    [JourneyActionTypes.UPLOAD_IMAGES_SUCCESS]: emptyProps(),
    [JourneyActionTypes.UPLOAD_IMAGES_FAILURE]: props<{ error: ErrorType }>(),

    [JourneyActionTypes.DOWNLOAD_IMAGE]: props<{ key: string }>(),
    [JourneyActionTypes.DOWNLOAD_IMAGE_SUCCESS]: emptyProps(),
    [JourneyActionTypes.DOWNLOAD_IMAGE_FAILURE]: props<{ error: ErrorType }>(),

    [JourneyActionTypes.DELETE_IMAGES]: props<{ images: string[] }>(),
    [JourneyActionTypes.DELETE_IMAGES_SUCCESS]: emptyProps(),
    [JourneyActionTypes.DELETE_IMAGES_FAILURE]: props<{ error: ErrorType }>(),
  },
});
