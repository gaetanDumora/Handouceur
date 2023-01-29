import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { themes } from '../../constants/themes';
import { ThemeService } from '../../shared/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  currentTheme: string;
  currentActiveTheme = this.themeService.getDarkTheme().pipe(
    map((isDarkTheme: boolean) => {
      const [lightTheme, darkTheme] = themes;

      this.currentTheme = isDarkTheme ? lightTheme.name : darkTheme.name;

      if (this.overlayContainer) {
        const overlayContainerClasses =
          this.overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from(overlayContainerClasses).filter(
          (item: string) => item.includes('-theme')
        );
        if (themeClassesToRemove.length) {
          overlayContainerClasses.remove(...themeClassesToRemove);
        }
        overlayContainerClasses.add(this.currentTheme);
      }

      return this.currentTheme;
    })
  );

  constructor(
    private themeService: ThemeService,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit(): void {
    if (this.overlayContainer) {
      this.overlayContainer
        .getContainerElement()
        .classList.add(this.currentTheme);
    }
  }
}
