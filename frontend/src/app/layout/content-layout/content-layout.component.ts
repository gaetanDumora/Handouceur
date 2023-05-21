import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { THEMES } from '../../constants/themes';
import { Store } from '@ngrx/store';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  currentTheme: BehaviorSubject<string>;

  constructor(private store: Store, private themeService: ThemeService) {}

  ngOnInit() {
    this.store
      .select(isDarkTheme)
      .pipe(
        map((isDarkTheme) => {
          this.currentTheme = new BehaviorSubject(
            isDarkTheme ? THEMES.LIGHT : THEMES.DARK
          );
          return this.themeService.applyTheme(this.currentTheme.value);
        })
      )
      .subscribe();
  }
}
