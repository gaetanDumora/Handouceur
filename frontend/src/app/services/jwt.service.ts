import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DecodedJWTToken, Token } from 'types/types';
import { LocalStorageService } from './localStorage.service';
import { TOKEN_LIFE_TIME, TOKEN_TYPES, SECOND } from '../constants/tokens';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  private jwtToken: Token = { key: TOKEN_TYPES.ACCESS };
  private decodedToken: DecodedJWTToken;

  constructor(private localStorageService: LocalStorageService) {}

  setToken(value: string) {
    this.jwtToken.value = value;
    this.decodeToken();
    this.localStorageService.set(this.jwtToken.key, value);
  }

  removeToken() {
    this.localStorageService.remove(this.jwtToken.key);
  }

  private decodeToken() {
    if (this.jwtToken.value) {
      this.decodedToken = jwt_decode(this.jwtToken.value, { header: false });
    }
  }

  getUser() {
    return this.decodedToken;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.decodedToken.iat;
    if (expiryTime) {
      return SECOND * expiryTime - new Date().getTime() < TOKEN_LIFE_TIME; // 1 WEEK
    }
    return false;
  }
}
