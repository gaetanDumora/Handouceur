import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { journeyReducer } from './app/store/journey/journey.reducer';
import { provideEffects } from '@ngrx/effects';
import { JourneyEffects } from './app/store/journey/journey.effects';
import { HttpClient } from '@angular/common/http';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideStore(journeyReducer),
//     provideEffects(JourneyEffects),
//     HttpClient,
//   ],
// });
