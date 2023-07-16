import { Component, Input } from '@angular/core';
import { Journey } from 'src/app/types/journeys';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { MapComponent } from '../journey-map/map.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarouselComponent,
    MapComponent,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
  ],
})
export class JourneyComponent {
  @Input() journey: Journey;
  @Input() isDarkTheme: boolean | null | undefined;
  @Input() isAdmin: boolean | null | undefined;

  constructor() {}
}
