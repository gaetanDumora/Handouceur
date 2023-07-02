import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Journey } from 'src/app/types/journeys';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { getAdminStatus } from 'src/app/store/user/user.selectors';
import { MapComponent } from '../journey-map/map.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
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
  isAdmin: Observable<boolean | undefined>;
  isDarkThem: Observable<boolean | undefined>;

  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
    this.isDarkThem = this.store.select(isDarkTheme);
  }
}
