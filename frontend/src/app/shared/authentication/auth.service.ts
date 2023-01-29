import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { User } from 'types/types';
import { JWTTokenService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.apiUrl}/user`;
  private _user = new BehaviorSubject<User | null>(null);
  errorMessage: string;
  registered: boolean = false;

  constructor(
    private http: HttpClient,
    private jwtTokenService: JWTTokenService
  ) {}

  isUser(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http
      .get<{ exist: boolean }>(this.baseURL + '/isUser', { params })
      .pipe(catchError(this.handleError));
  }

  registerUser({
    email,
    username,
    password,
  }: {
    email: string;
    username?: string;
    password: string;
  }) {
    return this.http
      .post<User>(this.baseURL + '/registerUser', {
        email,
        name: username,
        password,
      })
      .subscribe({
        next: () => (this.registered = true),
        error: (error) => {
          this.handleError(error);
          this.errorMessage = error?.error?.message;
        },
      });
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<User>(this.baseURL + '/login', { email, password })
      .subscribe({
        next: (logedUser) => {
          this.jwtTokenService.setToken(logedUser.accessToken);
          this._user.next(logedUser);
        },
        error: (error) => {
          this.handleError(error);
          this.errorMessage = error?.error?.message;
        },
      });
  }

  get user() {
    return this._user.value;
  }

  logout() {
    this._user.next(null);
    return this.jwtTokenService.removeToken();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => error);
  }
}
