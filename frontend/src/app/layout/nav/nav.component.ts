import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '../../shared/services/theme.service';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/user-store/user.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  private darkThemeActive = true;
  isDarkTheme: Observable<boolean>;
  user: Observable<User | null>;

  constructor(private store: Store, private themeService: ThemeService) {}

  ngOnInit() {
    this.user = this.store.select(getUser);
    this.isDarkTheme = this.themeService.getDarkTheme();
  }

  changeTheme() {
    this.darkThemeActive = !this.darkThemeActive;
    this.themeService.setDarkTheme(this.darkThemeActive);
  }
}
