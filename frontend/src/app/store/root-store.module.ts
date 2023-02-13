import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserStoreModule } from './user-store/user-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CommonModule,
    UserStoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
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
