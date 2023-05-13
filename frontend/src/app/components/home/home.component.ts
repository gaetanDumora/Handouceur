import { Component } from '@angular/core';
import { Journey } from 'src/app/models/journeys';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAllJourney } from '../journey/store/journey.selectors';
import { getAdminStatus } from 'src/app/root-store/root.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  journeys: Observable<Journey[] | []>;
  isAdmin: Observable<Boolean | undefined>;
  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
    this.journeys = this.store.select(getAllJourney);
  }
}
