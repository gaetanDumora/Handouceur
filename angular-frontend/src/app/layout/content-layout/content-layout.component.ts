import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { themes } from '../../core/constants/themes';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  currentTheme: string;
  currentActiveTheme = this.themeService.getDarkTheme().pipe(
    map((isDarkTheme: boolean) => {
      const [lightTheme, darkTheme] = themes;

      this.currentTheme = isDarkTheme ? lightTheme.name : darkTheme.name;

      return this.currentTheme;
    })
  );

  constructor(private themeService: ThemeService) {}
}
