import { Component, OnInit } from '@angular/core';
import { Journey } from 'src/app/models/journeys';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAllJourney } from '../journey/state/journey.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  journeys: Observable<Journey[] | []>;

  constructor(private store: Store) {
    this.journeys = this.store.select(getAllJourney);
  }
}
