import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Journey } from 'src/app/models/journeys';
import { environment } from 'src/environment/environment';

interface Slide {
  id: number;
  key: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnInit {
  @Input() journey: Journey;
  @ViewChild('img') img: ElementRef;
  private baseURL = `${environment.apiUrl}/journey/image/`;
  private defaultSlide: Slide = { id: 0, key: this.baseURL + 'empty.jpg' };
  private slides: Slide[];
  public currentSlide: Slide;
  public isImageLoaded = new BehaviorSubject(false);

  constructor() {}

  onPreviousClick() {
    const prevId = this.currentSlide.id - 1;
    const prevSlide = this.slides.find(({ id }) => id === prevId);
    const slideToDisplay =
      prevSlide || this.slides[this.slides.length - 1] || this.defaultSlide;
    return this.loadSlideImage(slideToDisplay);
  }

  onNextClick() {
    const nextId = this.currentSlide.id + 1;
    const nextSlide = this.slides.find(({ id }) => id === nextId);
    const slideToDisplay = nextSlide || this.slides[0] || this.defaultSlide;
    return this.loadSlideImage(slideToDisplay);
  }

  private loadSlideImage(slide: Slide) {
    this.currentSlide = slide;
    this.isImageLoaded.next(false);
  }

  ngOnInit() {
    if (this.journey.images?.length) {
      this.slides = this.journey.images.map((key, id) => ({
        id,
        key: this.baseURL + key,
      }));
    }

    this.currentSlide = this.slides[0] || this.defaultSlide;
  }

  ngAfterViewInit() {
    this.img.nativeElement.onload = () => this.isImageLoaded.next(true);
    this.img.nativeElement.onerror = () => this.isImageLoaded.next(false);
    this.loadSlideImage(this.currentSlide);
  }
}
