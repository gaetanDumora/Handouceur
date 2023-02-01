import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '../../shared/services/theme.service';
import { JWTTokenService } from 'src/app/shared/authentication/jwt.service';
import { AccessToken } from 'types/types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  private darkThemeActive = true;
  isDarkTheme: Observable<boolean>;
  userToken: Observable<AccessToken>;
  tokenId: number;
  tokenUserName: string | undefined;
  isAdmin: boolean;

  constructor(
    private themeService: ThemeService,
    public jwtTokenService: JWTTokenService
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.getDarkTheme();
    this.userToken = this.jwtTokenService.getDecodedToken();
    this.userToken.subscribe({
      next: (content) => {
        if (content) {
          this.tokenId = content.id;
          this.tokenUserName = content.name;
          this.isAdmin = content.admin;
        }
      },
    });
  }

  changeTheme() {
    this.darkThemeActive = !this.darkThemeActive;
    this.themeService.setDarkTheme(this.darkThemeActive);
  }
}
