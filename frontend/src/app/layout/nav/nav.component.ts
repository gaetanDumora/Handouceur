import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public isDarkTheme: Observable<boolean>;
  private isActive = true;

  navItems = [
    { link: '/home', title: 'Home', show: true },
    { link: '/about', title: 'About', show: true },
    { link: '/contact', title: 'Contact', show: true },
    { link: '/admin', title: 'Admin', show: true },
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.getDarkTheme();
  }

  changeTheme() {
    this.isActive = !this.isActive;
    this.themeService.setDarkTheme(this.isActive);
  }
}
