import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './root.reducer';
import { RootEffect } from './root.effects';
import { ROOT_FEATURE_KEY } from './state';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([RootEffect]),
    StoreModule.forFeature(ROOT_FEATURE_KEY, rootReducer),
  ],
  declarations: [],
})
export class RootStoreModule {}
