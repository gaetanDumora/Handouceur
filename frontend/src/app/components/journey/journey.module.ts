import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { journeyReducer } from './store/journey.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JourneyEffects } from './store/journey.effects';
import { JOURNEY_FEATURE_KEY } from './store/state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(JOURNEY_FEATURE_KEY, journeyReducer),
    EffectsModule.forFeature([JourneyEffects]),
  ],
})
export class JourneyModule {}
