import { Component } from '@angular/core';
import { Journey } from 'src/app/models/journeys';
import { Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { getAllJourney } from '../../../store/journey/journey.selectors';
import { getAdminStatus } from 'src/app/store/user/user.selectors';
import { JourneyComponent } from '../journey-card/journey.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss'],
  standalone: true,
  imports: [JourneyComponent, SharedModule, RouterModule],
})
export class JourneyListComponent {
  journeys: Observable<Journey[] | []>;
  isAdmin: Observable<Boolean | undefined>;
  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
    this.journeys = this.store.select(getAllJourney);
  }
}
