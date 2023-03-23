import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { JOURNEY_ACTIONS } from './components/journey/state/journey.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(JOURNEY_ACTIONS.loadAllJourney());
  }
}
