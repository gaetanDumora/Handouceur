import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Journey } from 'src/app/models/journeys';
import { getAdminStatus } from 'src/app/root-store/root.selectors';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent {
  @Input() journey: Partial<Journey>;
  isAdmin: Observable<boolean | undefined>;

  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
  }
}
