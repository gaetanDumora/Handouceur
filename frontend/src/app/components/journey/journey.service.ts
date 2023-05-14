import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Journey, SuggestedLocations } from 'src/app/models/journeys';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  private baseURL = `${environment.apiUrl}/journey`;
  constructor(private http: HttpClient) {}

  getAllJourney() {
    return this.http.get<Journey[]>(this.baseURL + '/getAll');
  }

  getJourneyById(id: number) {
    const params = new HttpParams().set('id', id);
    return this.http
      .get<Journey>(`${this.baseURL}/getById`, { params })
      .pipe(catchError(this.handleError));
  }

  postJourney(journey: Journey) {
    return this.http
      .post<Journey>(this.baseURL + '/upsert', journey)
      .pipe(catchError(this.handleError));
  }

  deleteJourney(id: number) {
    return this.http
      .post<{ id: number }>(this.baseURL + '/delete', { id })
      .pipe(catchError(this.handleError));
  }

  uploadFiles(files: FormData) {
    return this.http
      .post(`${this.baseURL}/image/upload`, files)
      .pipe(catchError(this.handleError));
  }

  deleteFiles(files: string[]) {
    return this.http
      .post(`${this.baseURL}/image/delete`, { filesToDelete: files })
      .pipe(catchError(this.handleError));
  }

  downloadFile(key: string) {
    return this.http
      .get(`${this.baseURL}/image/${key}`)
      .pipe(catchError(this.handleError));
  }

  searchLocation(val: string) {
    return this.http
      .get<SuggestedLocations>(
        `https://api.opencagedata.com/geocode/v1/json?q=${val}&key=${environment.openCageToken}&language=fr&pretty=1&limit=10`
      )
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
    return throwError(() => error);
  }
}
