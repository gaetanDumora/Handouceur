import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { httpInterceptorProviders } from './interceptors/index';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    NgxSkeletonLoaderModule.forRoot({
      theme: { extendsFromRoot: true },
      animation: false,
    }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [httpInterceptorProviders],
})
export class SharedModule {}
