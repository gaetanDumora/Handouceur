import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/user-store/user.selectors';
import { Observable } from 'rxjs';
import { USER_ACTIONS } from 'src/app/store/user-store/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
