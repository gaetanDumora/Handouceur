import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
import { ROOT_ACTIONS } from 'src/app/store/root/root.actions';
import { getUser } from 'src/app/store/user/user.selectors';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class NavComponent {
  isDarkTheme = this.store.select(isDarkTheme);
  user = this.store.select(getUser);
  hasChanged = false;
  constructor(private store: Store) {}

  changeTheme() {
    this.store.dispatch(
      ROOT_ACTIONS.setDarkTheme({ isDarkTheme: this.hasChanged })
    );
    this.hasChanged = !this.hasChanged;
  }
}
