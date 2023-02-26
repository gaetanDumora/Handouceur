import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Journey } from 'src/app/models/journeys';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() journey: Partial<Journey>;
  coordinates: [number, number];
  mapId: number;
  constructor() {
    // this.coordinates = [46.1911, -1.3945];
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
