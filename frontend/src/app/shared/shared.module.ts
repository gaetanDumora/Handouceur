import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { httpInterceptorProviders } from './interceptors/index';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, MaterialModule, HttpClientModule],
  exports: [CommonModule, RouterModule, MaterialModule, HttpClientModule],
  providers: [httpInterceptorProviders],
})
export class SharedModule {}
