import { AfterViewInit, Component, Input } from '@angular/core';

interface Slide {
  id: number;
  src: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @Input() journeyId: number;
  slides = [
    { id: 1, src: '../../../assets/photo.jpg' },
    {
      id: 2,
      src: 'https://i-det.unimedias.fr/sites/art-de-vivre/files/styles/large/public/couv-reunion-web-hemis_3029025.jpg?auto=compress%2Cformat&crop=faces%2Cedges&cs=srgb&fit=crop&h=598&w=900',
    },
    {
      id: 3,
      src: 'https://www.megeve-tourisme.fr/app/uploads/2022/02/ski-domaine-evasion-mont-blanc-megeve.jpg',
    },
  ];
  private HTMLImageElement: HTMLImageElement;
  private currentSlide: Slide;
  public isLoading = true;

  constructor() {}

  onPreviousClick() {
    const previousId = this.currentSlide.id - 1;
    const previousSlide = this.slides.find(({ id }) => id === previousId);
    this.currentSlide = previousSlide || this.slides[this.slides.length - 1];
    return this.loadImage(this.currentSlide.src);
  }

  onNextClick() {
    const nextId = this.currentSlide.id + 1;
    const nextSlide = this.slides.find(({ id }) => id === nextId);
    this.currentSlide = nextSlide || this.slides[0];
    return this.loadImage(this.currentSlide.src);
  }

  private loadImage(url: string) {
    this.isLoading = true;
    this.HTMLImageElement.onload = () => (this.isLoading = false);
    this.HTMLImageElement.src = url;
  }

  ngAfterViewInit() {
    this.HTMLImageElement = document.getElementById(
      `image-${this.journeyId}`
    ) as HTMLImageElement;
    this.currentSlide = this.slides[0];
    return this.loadImage(this.currentSlide.src);
  }
}
