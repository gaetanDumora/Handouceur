import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { authActions } from 'src/app/store/auth/auth.actions';

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
    this.store.dispatch(authActions.logoutUser());
  }
}
