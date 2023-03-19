import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JourneyService } from '../journey.service';
import { JOURNEY_ACTIONS } from './journey.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class JourneyEffects {
  constructor(
    private actions: Actions,
    private journeyService: JourneyService
  ) {}

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
}
