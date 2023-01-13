import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '../../core/services/theme.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

import { LoginComponent } from '../../modules/user/authentication/login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public isDarkTheme: Observable<boolean>;

  navItems = [
    { link: '/home', title: 'Home', show: true },
    { link: '/about', title: 'About', show: true },
    { link: '/contact', title: 'Contact', show: true },
    { link: '/admin', title: 'Admin', show: true },
  ];

  constructor(
    private themeService: ThemeService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.getDarkTheme();
  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
  openLoginDialog() {
    this.dialogService.open(LoginComponent, {
      title: 'Register/Login',
    });
  }
}
