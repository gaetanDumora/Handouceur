import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private dialog: DialogService,
    private authService: AuthService
  ) {}
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  async tryLogin() {
    if (this.email.value) {
      this.authService.isRegistered({ email: this.email.value }).subscribe();
      // this.dialog.open(RegisterComponent, { title: 'Create Account' });
    }
  }
}
