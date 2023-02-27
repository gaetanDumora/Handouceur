import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import {
  Map,
  Control,
  DomUtil,
  ZoomAnimEvent,
  Layer,
  MapOptions,
  tileLayer,
  latLng,
  marker,
  icon,
  map,
} from 'leaflet';

@Component({
  selector: 'app-map',
  template: `<div
    [id]="mapId"
    class="mapCircle"
    (leafletMapZoomEnd)="onMapZoomEnd($event)"
  ></div>`,
  styles: [
    `
      .mapCircle {
        height: 120px;
        width: 120px;
        border-radius: 50%;
      }
    `,
  ],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input() coordinates: [number, number];
  @Input() mapId: number;

  public map: Map;
  public zoom: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const [latitude, longitude] = this.coordinates;

    this.map = map(`${this.mapId}`, {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          opacity: 0.5,
          detectRetina: true,
        }),
      ],
      zoomControl: false,
      zoom: 3,
      center: latLng(latitude, longitude),
    });

    const pointer = marker([latitude, longitude], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).addTo(this.map);
    //   .bindPopup('Great sejour.<br> Handouceur power!');

    // this.map.on('mousemove', () => pointer.openPopup());
    // this.map.on('mouseout', () => pointer.closePopup());

    this.map$.emit(this.map);
    // this.zoom = map.getZoom();
    // this.zoom$.emit(this.zoom);
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners();
    this.map.remove();
  }

  onMapZoomEnd(e: any) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
