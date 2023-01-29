import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '../../shared/utils/theme.service';
import { JWTTokenService } from 'src/app/shared/authentication/jwt.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public isDarkTheme: Observable<boolean>;
  private isActive = true;

  navItems = [
    { link: '/home', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' },
    { link: '/admin', title: 'Admin' },
  ];

  constructor(
    private themeService: ThemeService,
    public jwtTokenService: JWTTokenService
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.getDarkTheme();
  }

  changeTheme() {
    this.isActive = !this.isActive;
    this.themeService.setDarkTheme(this.isActive);
  }
}
