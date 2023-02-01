import { Component, OnInit } from '@angular/core';
import { JWTTokenService } from 'src/app/shared/authentication/jwt.service';
import { AccessToken, User } from 'types/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private jwtTokenService: JWTTokenService) {}
  ngOnInit(): void {
    this.jwtTokenService
      .getDecodedToken()
      .subscribe((user) => (this.user = user));
  }
  logoutUser() {
    this.jwtTokenService.removeToken();
    this.user = null;
  }
}
