import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { THEMES } from '../../../constants/themes';
import { Store } from '@ngrx/store';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
import { ThemeService } from 'src/app/store/root/theme.service';
import { BehaviorSubject } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  standalone: true,
  imports: [FooterComponent, NavComponent, RouterModule, CommonModule],
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
