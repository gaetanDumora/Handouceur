import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { rootReducer, metaReducers } from './root.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootEffect } from './root.effects';
import { ROOT_FEATURE_KEY } from './state';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([RootEffect]),
    StoreModule.forRoot(
      { [ROOT_FEATURE_KEY]: rootReducer },
      {
        metaReducers,
        runtimeChecks: {
          strictActionTypeUniqueness: true, // Uniq name for Actions.
          strictActionImmutability: true, // Actions can not be altered in reducers.
          strictStateImmutability: true, // States can not be altered inside actions.
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      name: 'Handouceur',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  declarations: [],
})
export class RootStoreModule {}
