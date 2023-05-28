import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../store/user/auth.service';
import { ERROR_MESSAGES, REGEX } from 'src/app/constants/forms';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getError, isLoading } from 'src/app/store/user/user.selectors';
import { BehaviorSubject } from 'rxjs';
import { USER_ACTIONS } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;
  error = this.store.select(getError);
  isLoading = this.store.select(isLoading);
  isSubmitted: BehaviorSubject<boolean>;
  constructor(public authService: AuthService, private store: Store) {}

  ngOnInit() {
    this.isSubmitted = new BehaviorSubject(false);
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEX.emailCheck),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        this.checkUsername,
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.checkPassword,
      ]),
    });
  }

  checkEmailExist() {
    const emailField = this.registerForm.get('email');
    if (emailField?.status === 'VALID') {
      this.authService.isUser(emailField.value).subscribe({
        next: ({ exist }) => {
          if (exist) {
            emailField.setErrors({ exist });
          }
        },
      });
    }
  }
  getErrorEmail() {
    const emailField = this.registerForm.get('email');
    return emailField?.hasError('required')
      ? ERROR_MESSAGES.email.require
      : emailField?.hasError('pattern')
      ? ERROR_MESSAGES.email.notValid
      : emailField?.hasError('exist')
      ? ERROR_MESSAGES.email.exist
      : '';
  }
  getErrorUsername() {
    const firstNameField = this.registerForm.get('firstName');
    return firstNameField?.hasError('required')
      ? ERROR_MESSAGES.firstName.require
      : '';
  }
  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required')
      ? ERROR_MESSAGES.password.require
      : this.registerForm.get('password')?.hasError('requirements')
      ? ERROR_MESSAGES.password.hint
      : '';
  }

  checkUsername(control: { value: string }) {
    const enteredUsername = control.value;
    return enteredUsername ? null : { requirements: true };
  }
  checkPassword(control: { value: string }) {
    const enteredPassword = control.value;
    return !REGEX.passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  checkValidation(input: string) {
    return (
      this.registerForm.get(input)?.invalid &&
      (this.registerForm.get(input)?.dirty ||
        this.registerForm.get(input)?.touched)
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const password = formData.value.password;
    const firstName = formData.value.firstName;
    const lastName = formData.value.lastName ?? 'unknown';

    this.store.dispatch(
      USER_ACTIONS.submitCredentials({ email, password, firstName, lastName })
    );

    this.isSubmitted.next(formDirective.submitted);

    formDirective.resetForm();
    this.registerForm.reset();
  }
}

@Component({
  template: '',
})
export class DialogRegister {
  constructor(
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.openDialog();
  }
  openDialog(): void {
    this.dialog
      .open(RegisterComponent, {
        title: 'Create an account',
      })
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
