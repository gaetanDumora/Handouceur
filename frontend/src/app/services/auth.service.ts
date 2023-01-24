import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

interface User {
  id?: number;
  name?: string;
  email?: string;
  accessToken?: string;
  admin?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isUser(email: string) {
    const url = `${environment.apiUrl}/user/isUser`;
    const params = new HttpParams().set('email', email);
    return this.http
      .get<{ exist: boolean }>(url, { params })
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
    const url = `${environment.apiUrl}/user/registerUser`;
    return this.http
      .post<User>(url, { email, name: username, password })
      .pipe(catchError(this.handleError));
  }

  login({ email, password }: { email: string; password: string }) {
    const url = `${environment.apiUrl}/user/login`;
    return this.http
      .post<User>(url, { email, password })
      .pipe(catchError(this.handleError));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  Logout() {
    let removeToken = localStorage.removeItem('access_token');
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
