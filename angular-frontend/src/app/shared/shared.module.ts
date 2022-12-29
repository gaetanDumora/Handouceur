import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [CommonModule, RouterModule, MaterialModule],
})
export class SharedModule {}
