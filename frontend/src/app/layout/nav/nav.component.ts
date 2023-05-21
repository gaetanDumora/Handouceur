import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
import { ROOT_ACTIONS } from 'src/app/store/root/root.actions';
import { getUser } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isDarkTheme: BehaviorSubject<boolean>;
  user: Observable<User | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(isDarkTheme)
      .pipe(map((theme) => (this.isDarkTheme = new BehaviorSubject(theme))))
      .subscribe();
    this.user = this.store.select(getUser);
  }

  changeTheme() {
    const isDarkTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(isDarkTheme);
    this.store.dispatch(ROOT_ACTIONS.setDarkTheme({ isDarkTheme }));
  }
}
