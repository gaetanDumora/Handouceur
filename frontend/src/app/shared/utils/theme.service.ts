import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { DARK_THEME } from 'src/app/constants/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme: BehaviorSubject<boolean>;

  constructor(private localStorageService: LocalStorageService) {
    this.isDarkTheme = new BehaviorSubject<boolean>(
      this.localStorageService.get(DARK_THEME) === 'true'
    );
  }

  setDarkTheme(isDarkTheme: boolean) {
    this.isDarkTheme.next(isDarkTheme);
    this.localStorageService.set(DARK_THEME, this.isDarkTheme.value.toString());
  }

  getDarkTheme(): Observable<boolean> {
    return this.isDarkTheme;
  }
}
