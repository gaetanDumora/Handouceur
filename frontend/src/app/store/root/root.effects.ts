import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ROOT_ACTIONS } from './root.actions';
import { map, switchMap } from 'rxjs';
import { ThemeService } from './theme.service';

@Injectable()
export class RootEffect {
  setDarkMode = createEffect(
    () =>
      this.actions.pipe(
        ofType(ROOT_ACTIONS.setDarkTheme),
        switchMap(({ isDarkTheme }) => {
          return this.themeService
            .setDarkTheme(isDarkTheme)
            .pipe(
              map((value) => ROOT_ACTIONS.setDarkTheme({ isDarkTheme: value }))
            );
        })
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions, private themeService: ThemeService) {}
}
