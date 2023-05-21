import { Component } from '@angular/core';
import { Journey } from 'src/app/models/journeys';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAllJourney } from '../../store/journey/journey.selectors';
import { getAdminStatus } from 'src/app/store/user/user.selectors';
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
