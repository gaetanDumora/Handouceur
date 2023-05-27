import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyComponent } from './components/journey-card/journey.component';
import { JourneyEditComponent } from './components/journey-edit/journey-edit.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { AutocompleteComponent } from 'src/app/shared/autocomplete/autocomplete.component';
import { MapComponent } from './components/journey-map/map.component';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { JourneyListComponent } from './components/journey-list/journey-list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [],
})
export class JourneyModule {}
