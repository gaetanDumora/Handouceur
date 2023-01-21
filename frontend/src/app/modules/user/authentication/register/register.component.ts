import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    const emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(emailregex),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.checkPassword,
      ]),
    });
  }
  getErrorEmail() {
    return this.registerForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.registerForm.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }
  checkPassword(control: { value: any }) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required')
      ? 'Password is required'
      : this.registerForm.get('password')?.hasError('requirements')
      ? 'Password needs to be at least six characters, one uppercase letter and one number'
      : '';
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

    this.authService.registerUser({ email, password, username }).subscribe();
    formDirective.resetForm();
    this.registerForm.reset();
  }
  openLoginForm() {
    this.dialog.open(LoginComponent, { title: 'Login' });
  }
}
