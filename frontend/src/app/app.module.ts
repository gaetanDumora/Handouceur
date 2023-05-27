import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NavComponent } from './features/home/components/nav/nav.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { ContentLayoutComponent } from './features/home/components/content-layout/content-layout.component';
import { FooterComponent } from './features/home/components/footer/footer.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { ProfileComponent } from './features/user/components/profile/profile.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { AppStoreModule } from './store/app-store.module';

import { AutocompleteComponent } from 'src/app/shared/autocomplete/autocomplete.component';
import { JourneyComponent } from './features/journey/components/journey-card/journey.component';
import { JourneyEditComponent } from './features/journey/components/journey-edit/journey-edit.component';
import { MapComponent } from './features/journey/components/journey-map/map.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { JourneyListComponent } from './features/journey/components/journey-list/journey-list.component';
import { AdminComponent } from './features/user/components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ContentLayoutComponent,
    FooterComponent,
    DialogComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    JourneyComponent,
    JourneyEditComponent,
    AutocompleteComponent,
    MapComponent,
    CarouselComponent,
    JourneyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AppStoreModule,
    LeafletModule,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd-MM-YYYY' },
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
