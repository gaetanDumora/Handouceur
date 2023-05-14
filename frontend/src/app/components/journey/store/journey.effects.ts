import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JourneyService } from '../journey.service';
import { JOURNEY_ACTIONS } from './journey.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JourneyEffects {
  constructor(
    private actions: Actions,
    private journeyService: JourneyService
  ) {}

  getSelectedJourney = createEffect(() =>
    this.actions.pipe(
      ofType(JOURNEY_ACTIONS.loadSelectedJourney),
      switchMap(({ id }) =>
        this.journeyService.getJourneyById(id).pipe(
          map((journey) =>
            JOURNEY_ACTIONS.loadSelectedJourneySuccess({ journey })
          ),
          catchError(({ error }) =>
            of(
              JOURNEY_ACTIONS.loadSelectedJourneyFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  loadJourneys = createEffect(() =>
    this.actions.pipe(
      ofType(JOURNEY_ACTIONS.loadAllJourney),
      switchMap(() => {
        return this.journeyService.getAllJourney().pipe(
          map((journeys) =>
            JOURNEY_ACTIONS.loadAllJourneySuccess({ journeys })
          ),
          // TO DO: Inform User if error occurs when loading
          catchError(({ error }) =>
            of(JOURNEY_ACTIONS.loadAllJourneyFailure({ error: error.message }))
          )
        );
      })
    )
  );

  postJourney = createEffect(() =>
    this.actions.pipe(
      ofType(JOURNEY_ACTIONS.upsertJourney),
      switchMap(({ journey }) => {
        return this.journeyService.postJourney(journey).pipe(
          map((journey) => JOURNEY_ACTIONS.upsertJourneySuccess({ journey })),
          catchError(({ error }) =>
            of(JOURNEY_ACTIONS.upsertJourneyFailure({ error: error.message }))
          )
        );
      })
    )
  );

  deleteJourney = createEffect(() =>
    this.actions.pipe(
      ofType(JOURNEY_ACTIONS.deleteJourney),
      switchMap(({ id }) => {
        return this.journeyService.deleteJourney(id).pipe(
          map((id) => JOURNEY_ACTIONS.deleteJourneySuccess(id)),
          catchError(({ error }) =>
            of(JOURNEY_ACTIONS.deleteJourneyFailure({ error: error.message }))
          )
        );
      })
    )
  );

  uploadImages = createEffect(() =>
    this.actions.pipe(
      ofType(JOURNEY_ACTIONS.uploadImages),
      switchMap(({ images }) => {
        return this.journeyService.uploadFiles(images).pipe(
          map(() => JOURNEY_ACTIONS.uploadImagesSuccess()),
          catchError(({ error }) =>
            of(JOURNEY_ACTIONS.uploadImagesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  downloadImages = createEffect(() =>
    this.actions.pipe(
      ofType(JOURNEY_ACTIONS.downloadImage),
      switchMap(({ key }) => {
        return this.journeyService.downloadFile(key).pipe(
          map(() => JOURNEY_ACTIONS.downloadImageSuccess()),
          catchError(({ error }) =>
            of(JOURNEY_ACTIONS.downloadImageFailure({ error: error.message }))
          )
        );
      })
    )
  );

  deleteImages = createEffect(() =>
    this.actions.pipe(
      ofType(JOURNEY_ACTIONS.deleteImages),
      switchMap(({ images }) => {
        return this.journeyService.deleteFiles(images).pipe(
          map(() => JOURNEY_ACTIONS.deleteImagesSuccess()),
          catchError(({ error }) =>
            of(JOURNEY_ACTIONS.deleteImagesFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
