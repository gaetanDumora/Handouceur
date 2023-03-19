import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { journeyReducer } from './state/journey.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JourneyEffects } from './state/journey.effects';
import { JOURNEY_FEATURE_KEY } from './state/state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(JOURNEY_FEATURE_KEY, journeyReducer),
    EffectsModule.forFeature([JourneyEffects]),
  ],
})
export class JourneyModule {}
