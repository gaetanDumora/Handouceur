import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { AppStoreModule } from './store/app-store.module';
import { RegisterComponent } from './features/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent,
    RegisterComponent,
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
