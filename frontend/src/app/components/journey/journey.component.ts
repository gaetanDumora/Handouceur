import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Journey } from 'src/app/models/journeys';
import { getAdminStatus } from 'src/app/root-store/root.selectors';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent implements OnInit {
  @Input() journey: Partial<Journey>;
  coordinates: [number, number];
  mapId: number;
  isAdmin: Observable<boolean | undefined>;

  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
  }

  ngOnInit(): void {
    this.coordinates = this.journey.coordinates as [number, number];
    this.mapId = this.journey.id as number;
  }

  onFileInput(event: any) {
    const input = document.getElementById('inputFile') as any;
    const [file] = input.files;
    console.log(file);
  }
}
