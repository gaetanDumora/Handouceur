import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  DEFAULT_CURRENCY_CODE,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environment/environment';
import { httpInterceptors } from './app/shared/http-interceptors';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { userMetareducer, userReducer } from './app/store/user/user.reducer';
import { rootMetareducer, rootReducer } from './app/store/root/root.reducer';
import { journeyReducer } from './app/store/journey/journey.reducer';
import { JOURNEY_FEATURE_KEY } from './app/store/journey/state';
import { JourneyEffects } from './app/store/journey/journey.effects';
import { ROOT_FEATURE_KEY } from './app/store/root/state';
import { USER_FEATURE_KEY } from './app/store/user/state';
import { UserEffects } from './app/store/user/user.effects';
import { RootEffect } from './app/store/root/root.effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors(httpInterceptors)),
    provideStore(
      {
        [JOURNEY_FEATURE_KEY]: journeyReducer,
        [ROOT_FEATURE_KEY]: rootReducer,
        [USER_FEATURE_KEY]: userReducer,
      },
      {
        metaReducers: [userMetareducer, rootMetareducer],
        runtimeChecks: {
          strictActionTypeUniqueness: true, // Uniq name for Actions.
          strictActionImmutability: true, // Actions can not be altered in reducers.
          strictStateImmutability: true, // States can not be altered inside actions.
        },
      }
    ),
    provideEffects([JourneyEffects, UserEffects, RootEffect]),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule
    ),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd-MM-YYYY' },
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
}).catch((err) => console.error(err));
