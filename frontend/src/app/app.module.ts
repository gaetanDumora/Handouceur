import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from './shared/shared.module';
import { RootStoreModule } from './root-store/root-store.module';

import { AppComponent } from './app.component';
import { CardComponent } from './modules/card/card.component';
import { MapComponent } from './modules/card/map.component';
import { NavComponent } from './layout/nav/nav.component';
import { LoginComponent } from './modules/login/login.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AdminComponent } from './modules/admin/admin.component';

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
    CardComponent,
    MapComponent,
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
