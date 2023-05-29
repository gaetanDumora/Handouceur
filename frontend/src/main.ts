import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  DEFAULT_CURRENCY_CODE,
  enableProdMode,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environment/environment';
import { tokenInterceptor } from './app/shared/interceptors/http-interceptors';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { userMetareducer } from './app/store/user/user.reducer';
import { rootMetareducer } from './app/store/root/root.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserStoreModule } from './app/store/user/user-store.module';
import { RootStoreModule } from './app/store/root/root-store.module';
import { JourneyStoreModule } from './app/store/journey/journey-store.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule,
      // NgRx stores
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
      UserStoreModule,
      RootStoreModule,
      JourneyStoreModule
    ),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd-MM-YYYY' },
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
}).catch((err) => console.error(err));
