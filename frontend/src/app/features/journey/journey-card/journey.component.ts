import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Journey } from 'src/app/models/journeys';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { getAdminStatus } from 'src/app/store/user/user.selectors';
import { MapComponent } from '../journey-map/map.component';
@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
  standalone: true,
  imports: [SharedModule, CarouselComponent, MapComponent],
})
export class JourneyComponent {
  @Input() journey: Journey;
  isAdmin: Observable<boolean | undefined>;

  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
  }
}
