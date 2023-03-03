import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private baseURL = `${environment.apiUrl}/journey`;
  constructor(private http: HttpClient) {}
}
