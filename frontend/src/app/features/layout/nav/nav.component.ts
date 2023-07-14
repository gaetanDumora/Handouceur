import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
import { ROOT_ACTIONS } from 'src/app/store/root/root.actions';
import { getUser } from 'src/app/store/user/user.selectors';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { THEMES, NAV_ITEMS, NavItems } from 'src/app/constants/themes';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class NavComponent implements OnInit {
  @Output() onSideNav = new EventEmitter<Observable<NavItems>>();
  isDarkTheme = this.store.select(isDarkTheme);
  darkTheme: boolean;
  user = this.store.select(getUser);
  profileImg: Observable<string | null>;
  navItems: Observable<NavItems>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.profileImg = this.user.pipe(
      map((user) => {
        if (!user?.avatar) {
          return null;
        }
        return `${environment.apiUrl}/storage/${user.avatar}`;
      })
    );
    this.navItems = this.user.pipe(
      map((user) => {
        const defaultNavItems = [
          { name: NAV_ITEMS.JOURNEY, routerLink: 'journey' },
          { name: NAV_ITEMS.ABOUT, routerLink: 'about' },
          { name: NAV_ITEMS.CONTACT, routerLink: 'contact' },
        ];
        if (user?.admin) {
          defaultNavItems.push({ name: NAV_ITEMS.ADMIN, routerLink: 'admin' });
        }
        return defaultNavItems;
      })
    );
  }
  changeTheme() {
    this.isDarkTheme.subscribe((darkTheme) => (this.darkTheme = darkTheme));
    this.store.dispatch(
      ROOT_ACTIONS.setTheme({
        theme: this.darkTheme ? THEMES.DARK : THEMES.LIGHT,
      })
    );
  }
}
