import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { journeyReducer } from './journey.reducer';
import { JourneyEffects } from './journey.effects';
import { JOURNEY_FEATURE_KEY } from './state';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([JourneyEffects]),
    StoreModule.forFeature(JOURNEY_FEATURE_KEY, journeyReducer),
  ],
  declarations: [],
})
export class JourneyStoreModule {}
