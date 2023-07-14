import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

import { NavItems, THEMES } from '../../../constants/themes';
import { Store } from '@ngrx/store';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
import { ThemeService } from 'src/app/store/root/theme.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent,
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
  ],
})
export class ContentLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  sideNavItems: Observable<NavItems>;
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

  toogleSideNav(event: Observable<NavItems>) {
    this.sideNavItems = event;
    this.drawer.toggle();
  }
}
