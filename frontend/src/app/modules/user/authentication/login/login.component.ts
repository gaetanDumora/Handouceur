import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/modules/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  getErrorEmail() {
    return this.loginForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.loginForm.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }

  getErrorPassword() {
    return this.loginForm.get('password')?.hasError('required')
      ? 'Password is required'
      : this.loginForm.get('password')?.hasError('requirements')
      ? 'Password needs to be at least six characters, one uppercase letter and one number'
      : '';
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
    formDirective.resetForm();
    this.loginForm.reset();
  }
}
