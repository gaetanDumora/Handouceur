import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UserStoreModule } from './user/user-store.module';
import { RootStoreModule } from './root/root-store.module';
import { JourneyStoreModule } from './journey/journey-store.module';
import { userMetareducer } from './user/user.reducer';
import { rootMetareducer } from './root/root.reducer';

export const featureStores = [
  UserStoreModule,
  RootStoreModule,
  JourneyStoreModule,
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [userMetareducer, rootMetareducer],
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
      logOnly: isDevMode(),
    }),
    ...featureStores,
  ],
  declarations: [],
})
export class AppStoreModule {}
