import { Component } from '@angular/core';
import { Journey } from 'src/app/models/journeys';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAllJourney } from '../../../../store/journey/journey.selectors';
import { getAdminStatus } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss'],
})
export class JourneyListComponent {
  journeys: Observable<Journey[] | []>;
  isAdmin: Observable<Boolean | undefined>;
  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
    this.journeys = this.store.select(getAllJourney);
  }
}
