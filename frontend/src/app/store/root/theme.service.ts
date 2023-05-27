import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(true);

  constructor(private overlayContainer: OverlayContainer) {}

  setDarkTheme(isDarkTheme: boolean) {
    this.isDarkTheme.next(isDarkTheme);
    return this.isDarkTheme;
  }

  applyTheme(theme: string) {
    if (this.overlayContainer) {
      const overlayContainerClasses =
        this.overlayContainer.getContainerElement().classList;

      const themeClassesToRemove = Array.from(overlayContainerClasses).filter(
        (item: string) => item.includes('-theme')
      );

      if (themeClassesToRemove.length) {
        overlayContainerClasses.remove(...themeClassesToRemove);
      }
      overlayContainerClasses.add(theme);
    }
  }
}
