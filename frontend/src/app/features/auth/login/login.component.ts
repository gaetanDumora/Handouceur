import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorType } from 'src/app/types/error';
import { User } from 'src/app/types/user';
import { Observable } from 'rxjs';
import { ERROR_MESSAGES, REGEX } from 'src/app/constants/forms';
import { AuthService } from 'src/app/store/user/auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { USER_ACTIONS } from 'src/app/store/user/user.actions';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

import {
  getError,
  getUser,
  isLoading,
} from 'src/app/store/user/user.selectors';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean;
  error: Observable<ErrorType>;
  user: Observable<User | null>;
  isLoading: Observable<boolean>;

  constructor(private store: Store, public authService: AuthService) {}

  ngOnInit() {
    this.isLoading = this.store.select(isLoading);
    this.error = this.store.select(getError);
    this.user = this.store.select(getUser);
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        this.checkPassword,
      ]),
    });
  }

  getErrorEmail() {
    return this.loginForm.get('email')?.hasError('required')
      ? ERROR_MESSAGES.email.require
      : this.loginForm.get('email')?.hasError('pattern')
      ? ERROR_MESSAGES.email.notValid
      : '';
  }

  getErrorPassword() {
    return this.loginForm.get('password')?.hasError('required')
      ? ERROR_MESSAGES.password.require
      : this.loginForm.get('password')?.hasError('requirements')
      ? ERROR_MESSAGES.password.hint
      : '';
  }
  checkPassword(control: { value: any }) {
    const enteredPassword = control.value;
    return !REGEX.passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  checkValidation(input: string) {
    const validation =
      this.loginForm.get(input)?.invalid &&
      (this.loginForm.get(input)?.dirty || this.loginForm.get(input)?.touched);
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective) {
    const email = formData.value.email;
    const password = formData.value.password;

    this.store.dispatch(USER_ACTIONS.loginUser({ email, password }));

    if (this.user) {
      formDirective.resetForm();
      this.loginForm.reset();
    }
  }
}

@Component({
  template: '',
  standalone: true,
})
export class DialogLogin {
  constructor(
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.openDialog();
  }
  openDialog(): void {
    this.dialog
      .open(LoginComponent, {
        title: 'Login',
      })
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
