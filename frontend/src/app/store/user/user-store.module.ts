import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { USER_FEATURE_KEY } from './state';
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
  ],
})
export class UserStoreModule {}
