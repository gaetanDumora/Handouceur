import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StorageFolderPaths } from '../types/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private baseURL = `${environment.apiUrl}/storage`;
  constructor(private http: HttpClient) {}

  uploadFiles(files: FormData) {
    return this.http
      .post(`${this.baseURL}/upload`, files)
      .pipe(catchError(this.handleError));
  }

  deleteFiles(files: string[], folderName: StorageFolderPaths) {
    return this.http
      .post(`${this.baseURL}/delete`, { files, folderName })
      .pipe(catchError(this.handleError));
  }

  downloadFile(key: string) {
    const params = new HttpParams().set('key', key);
    return this.http
      .get(this.baseURL, { params })
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
