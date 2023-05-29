import { Component } from '@angular/core';
import { Journey } from 'src/app/types/journeys';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAllJourney } from '../../../store/journey/journey.selectors';
import { getAdminStatus } from 'src/app/store/user/user.selectors';
import { JourneyComponent } from '../journey-card/journey.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss'],
  standalone: true,
  imports: [
    JourneyComponent,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class JourneyListComponent {
  journeys: Observable<Journey[] | []>;
  isAdmin: Observable<Boolean | undefined>;
  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
    this.journeys = this.store.select(getAllJourney);
  }
}
