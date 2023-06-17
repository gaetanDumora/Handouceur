import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { isDarkTheme } from 'src/app/store/root/root.selectors';
import { ROOT_ACTIONS } from 'src/app/store/root/root.actions';
import { getUser } from 'src/app/store/user/user.selectors';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class NavComponent implements OnInit {
  isDarkTheme = this.store.select(isDarkTheme);
  user = this.store.select(getUser);
  hasChanged = false;
  profileImg: Observable<string>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.user.subscribe((attr) => {
      if (attr?.avatar) {
        this.profileImg = of(`${environment.apiUrl}/storage/${attr.avatar}`);
      }
    });
  }
  changeTheme() {
    this.store.dispatch(
      ROOT_ACTIONS.setDarkTheme({ isDarkTheme: this.hasChanged })
    );
    this.hasChanged = !this.hasChanged;
  }
}
