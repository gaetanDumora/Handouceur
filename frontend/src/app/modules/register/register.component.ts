import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ERROR_MESSAGES, REGEX } from 'src/app/constants/forms';

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
    this.createForm();
  }
  createForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEX.emailCheck),
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
  checkPassword(control: { value: any }) {
    const enteredPassword = control.value;
    return !REGEX.passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required')
      ? ERROR_MESSAGES.password.require
      : this.registerForm.get('password')?.hasError('requirements')
      ? ERROR_MESSAGES.password.hint
      : '';
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  checkValidation(input: string) {
    const validation =
      this.registerForm.get(input)?.invalid &&
      (this.registerForm.get(input)?.dirty ||
        this.registerForm.get(input)?.touched);
    return validation;
  }
  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const password = formData.value.password;
    const username = formData.value.username;

    this.authService.registerUser({ email, password, username });

    if (!this.authService.errorMessage) {
      formDirective.resetForm();
      this.registerForm.reset();
    }
  }
}
