import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { JOURNEY_ACTIONS } from './store/journey/journey.actions';
import { RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './features/layout/content-layout/content-layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, ContentLayoutComponent],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(JOURNEY_ACTIONS.loadAllJourney());
  }
}
