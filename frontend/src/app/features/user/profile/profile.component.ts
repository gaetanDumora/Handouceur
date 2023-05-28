import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/user/user.selectors';
import { Observable } from 'rxjs';
import { USER_ACTIONS } from 'src/app/store/user/user.actions';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class ProfileComponent implements OnInit {
  user: Observable<User | null>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.user = this.store.select(getUser);
  }
  logoutUser() {
    this.store.dispatch(USER_ACTIONS.logoutUser());
  }
}
