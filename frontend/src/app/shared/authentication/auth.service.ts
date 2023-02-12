import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.apiUrl}/user`;
  errorMessage: string;
  registered: boolean = false;

  constructor(private http: HttpClient) {}

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
    return this.http.post<User>(this.baseURL + '/registerUser', {
      email,
      name: username,
      password,
    });
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http.post(this.baseURL + '/login', { email, password });
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
