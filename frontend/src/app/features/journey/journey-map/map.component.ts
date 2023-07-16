import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
} from '@angular/core';
import { Map, MapOptions, tileLayer, latLng, marker, icon, map } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() coordinates: [number, number];
  @Input() mapId: number;
  @Input() isDarkTheme: boolean | null | undefined;

  public map: Map;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const [latitude, longitude] = this.coordinates;

    const options: MapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          detectRetina: true,
        }),
      ],
      attributionControl: false,
      zoomControl: false,
      zoom: 3,
      center: latLng(latitude, longitude),
    };

    this.map = map(`${this.mapId}`, options);

    marker([latitude, longitude], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).addTo(this.map);
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners();
    this.map.remove();
  }
}
