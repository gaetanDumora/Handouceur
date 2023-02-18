import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/authentication/auth.service';
import { ERROR_MESSAGES, REGEX } from 'src/app/constants/forms';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEX.emailCheck),
      ]),
      username: new FormControl(null, [
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
      this.authService.isUser(emailField?.value).subscribe({
        next: ({ exist }) => {
          if (exist) {
            emailField?.setErrors({ exist });
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
    const usernameField = this.registerForm.get('username');
    return usernameField?.hasError('required') ? 'Please enter a name' : '';
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
    const validation = enteredUsername ? null : { requirements: true };
    return validation;
  }
  checkPassword(control: { value: string }) {
    const enteredPassword = control.value;
    const validation =
      !REGEX.passwordCheck.test(enteredPassword) && enteredPassword
        ? { requirements: true }
        : null;
    return validation;
  }
  checkValidation(input: string) {
    const validation =
      this.registerForm.get(input)?.invalid &&
      (this.registerForm.get(input)?.dirty ||
        this.registerForm.get(input)?.touched);
    return validation;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const password = formData.value.password;
    const username = formData.value.username;

    this.authService.registerUser({ email, password, username });

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
