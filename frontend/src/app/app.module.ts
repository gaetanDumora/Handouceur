import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import { NavComponent } from './layout/nav/nav.component';
import { LoginComponent } from './modules/login/login.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AdminComponent } from './modules/admin/admin.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  AUTH_FEATURE_KEY,
  authReducer,
  metaReducers,
} from './store/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffect } from './store/auth/auth.effects';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(
      { [AUTH_FEATURE_KEY]: authReducer },
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
    EffectsModule.forRoot([AuthEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
