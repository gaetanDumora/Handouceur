import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  DEFAULT_CURRENCY_CODE,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { AppStoreModule } from './app/store/app-store.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environment/environment';
import { tokenInterceptor } from './app/shared/interceptors/http-interceptors';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app-routes';

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
      AppStoreModule
    ),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd-MM-YYYY' },
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
}).catch((err) => console.error(err));
