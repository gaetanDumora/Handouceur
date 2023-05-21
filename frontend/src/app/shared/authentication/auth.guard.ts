import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAdminStatus, getUser } from 'src/app/store/user/user.selectors';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(getAdminStatus).pipe(
      map((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['home/login']);
        }
        return true;
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: Observable<User | null>;
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(getUser).pipe(
      map((user) => {
        if (!user?.accessToken) {
          this.router.navigate(['home/login']);
        }
        return true;
      })
    );
  }
}
