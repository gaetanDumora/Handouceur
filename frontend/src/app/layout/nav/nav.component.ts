import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ThemeService } from '../../shared/utils/theme.service';
import { JWTTokenService } from 'src/app/shared/authentication/jwt.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  private darkThemeActive = true;

  constructor(
    private themeService: ThemeService,
    public jwtTokenService: JWTTokenService
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.getDarkTheme();
  }

  changeTheme() {
    this.darkThemeActive = !this.darkThemeActive;
    this.themeService.setDarkTheme(this.darkThemeActive);
  }
}
