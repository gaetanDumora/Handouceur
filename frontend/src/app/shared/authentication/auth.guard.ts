import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  jwtTokenUserId: number | undefined;
  constructor(
    private jwtTokenService: JWTTokenService,
    private router: Router
  ) {
    this.jwtTokenService
      .getDecodedToken()
      .subscribe((content) => (this.jwtTokenUserId = content?.id));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.jwtTokenUserId) {
      this.router.navigate(['home/login']);
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  isAdmin: boolean | undefined;
  constructor(
    private jwtTokenService: JWTTokenService,
    private router: Router
  ) {
    this.jwtTokenService
      .getDecodedToken()
      .subscribe((content) => (this.isAdmin = content?.admin));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isAdmin) {
      this.router.navigate(['home/login']);
    }
    return true;
  }
}
