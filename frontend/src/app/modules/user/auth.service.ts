import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

interface User {
  id: number;
  name?: string;
  email: string;
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
      .get<User>(url, { params })
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
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
