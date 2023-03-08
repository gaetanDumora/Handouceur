import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Journey } from 'src/app/models/journeys';
import { getAdminStatus } from 'src/app/root-store/root.selectors';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent implements OnInit, AfterViewInit {
  @Input() journey: Partial<Journey>;
  isLoading: boolean;
  isAdmin: Observable<boolean | undefined>;

  constructor(private store: Store) {
    this.isAdmin = this.store.select(getAdminStatus);
  }

  async ngOnInit() {
    this.isLoading = true;
  }

  loadImage(url: string, elem: HTMLImageElement) {
    return new Promise((resolve, reject) => {
      elem.onload = () => {
        resolve(elem);
        this.isLoading = false;
      };
      elem.onerror = reject;
      elem.src = url;
    });
  }

  async ngAfterViewInit() {
    const imageElement = document.getElementById(
      `image-${this.journey.id}`
    ) as HTMLImageElement;
    const { imageUrl } = this.journey;
    await this.loadImage(imageUrl!, imageElement!);
  }
}
