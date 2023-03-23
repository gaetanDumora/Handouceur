import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Journey } from 'src/app/models/journeys';

interface Slide {
  id: number;
  src: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnInit {
  @Input() journey: Journey;
  @ViewChild('img') img: ElementRef;
  private slides: Slide[];
  public currentSlide: Slide;
  public isImageLoaded: boolean;

  constructor() {}

  onPreviousClick() {
    const previousId = this.currentSlide.id - 1;
    const previousSlide = this.slides.find(({ id }) => id === previousId);
    this.currentSlide = previousSlide || this.slides[this.slides.length - 1];
    return this.loadImage();
  }

  onNextClick() {
    const nextId = this.currentSlide.id + 1;
    const nextSlide = this.slides.find(({ id }) => id === nextId);
    this.currentSlide = nextSlide || this.slides[0];
    return this.loadImage();
  }

  private loadImage() {
    this.img.nativeElement.onload = () => {
      this.isImageLoaded = true;
    };
  }

  ngOnInit() {
    this.isImageLoaded = false;
    this.slides = [
      { id: 1, src: this.journey.imageUrl! },
      {
        id: 2,
        src: 'https://i-det.unimedias.fr/sites/art-de-vivre/files/styles/large/public/couv-reunion-web-hemis_3029025.jpg?auto=compress%2Cformat&crop=faces%2Cedges&cs=srgb&fit=crop&h=598&w=900',
      },
      {
        id: 3,
        src: 'https://www.megeve-tourisme.fr/app/uploads/2022/02/ski-domaine-evasion-mont-blanc-megeve.jpg',
      },
    ];
    this.currentSlide = this.slides[0];
  }

  ngAfterViewInit() {
    this.loadImage();
  }
}
