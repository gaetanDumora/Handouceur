import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DecodedJWTToken, Token } from 'types/types';
import { LocalStorageService } from '../utils/localStorage.service';
import { TOKEN_LIFE_TIME, TOKEN_TYPES, SECOND } from '../../constants/tokens';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  private jwtToken: Token = { key: TOKEN_TYPES.ACCESS };
  private decodedToken: DecodedJWTToken;

  constructor(private localStorageService: LocalStorageService) {}

  setToken(value: string) {
    this.jwtToken.value = value;
    this.localStorageService.set(this.jwtToken.key, value);
  }

  removeToken() {
    this.localStorageService.remove(this.jwtToken.key);
  }

  isLogin() {
    return this.localStorageService.get(this.jwtToken.key) !== null;
  }

  private decodeToken() {
    const token = this.localStorageService.get(this.jwtToken.key);
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
  }

  get user() {
    this.decodeToken();
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
