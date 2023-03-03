import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from './shared/shared.module';
import { RootStoreModule } from './root-store/root-store.module';

import { AppComponent } from './app.component';
import { JourneyComponent } from './components/journey/journey.component';
import { MapComponent } from './components/journey/map.component';
import { NavComponent } from './layout/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { JourneyEditComponent } from './components/journey/journey-edit/journey-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ContentLayoutComponent,
    FooterComponent,
    DialogComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    JourneyComponent,
    MapComponent,
    JourneyEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    RootStoreModule,
    LeafletModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
