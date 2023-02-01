import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AccessToken } from 'types/types';
import { LocalStorageService } from '../services/localStorage.service';
import { TOKEN_TYPES } from '../../constants/tokens';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  private decodedToken = new BehaviorSubject<AccessToken>(null);

  constructor(private localStorageService: LocalStorageService) {}

  setToken(value: string) {
    this.localStorageService.set(TOKEN_TYPES.ACCESS, value);
    this.decodedToken.next(jwt_decode(value));
  }

  removeToken() {
    this.decodedToken.next(null);
    this.localStorageService.remove(TOKEN_TYPES.ACCESS);
  }

  getDecodedToken() {
    return this.decodedToken;
  }
}
