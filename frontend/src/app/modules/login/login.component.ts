import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ERROR_MESSAGES, REGEX } from 'src/app/constants/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: Boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
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
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  checkValidation(input: string) {
    const validation =
      this.loginForm.get(input)?.invalid &&
      (this.loginForm.get(input)?.dirty || this.loginForm.get(input)?.touched);
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const password = formData.value.password;

    this.authService.login({ email, password });

    if (this.authService.isLogin()) {
      formDirective.resetForm();
      this.loginForm.reset();
    }
  }
}
