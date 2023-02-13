import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffect } from './user.effects';
import { userReducer, metaReducers } from './user.reducer';
import { USER_FEATURE_KEY } from './state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, { metaReducers }),
    EffectsModule.forFeature([UserEffect]),
  ],
  providers: [UserEffect],
})
export class UserStoreModule {}
