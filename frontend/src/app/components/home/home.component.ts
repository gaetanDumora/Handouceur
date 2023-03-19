import { Component, OnInit } from '@angular/core';
import { Journey } from 'src/app/models/journeys';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { JOURNEY_ACTIONS } from '../journey/state/journey.actions';
import { getAllJourney } from '../journey/state/journey.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  journeys: Observable<Partial<Journey>[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(JOURNEY_ACTIONS.loadAllJourney());
    this.journeys = this.store.select(getAllJourney);
  }
}
