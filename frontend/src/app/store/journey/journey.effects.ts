import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JourneyService } from './journey.service';
import { JOURNEY_ACTIONS } from './journey.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { StorageService } from 'src/app/shared/storage.service';

@Injectable()
export class JourneyEffects {
  constructor(
    private actions: Actions,
    private journeyService: JourneyService,
    private storageService: StorageService
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
        return this.storageService.uploadFiles(images).pipe(
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
        return this.storageService.downloadFile(key).pipe(
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
        return this.storageService.deleteFiles(images).pipe(
          map(() => JOURNEY_ACTIONS.deleteImagesSuccess()),
          catchError(({ error }) =>
            of(JOURNEY_ACTIONS.deleteImagesFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
