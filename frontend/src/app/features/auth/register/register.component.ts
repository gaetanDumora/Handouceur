import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../store/user/user.service';
import { ERROR_MESSAGES, REGEX } from 'src/app/constants/forms';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getError, isLoading } from 'src/app/store/user/user.selectors';
import { BehaviorSubject } from 'rxjs';
import { USER_ACTIONS } from 'src/app/store/user/user.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SearchLocationComponent } from 'src/app/shared/components/search-location/search-location.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    SearchLocationComponent,
  ],
})
export class RegisterComponent implements OnInit {
  @ViewChild('autocomplete', { read: ElementRef }) autocomplete: ElementRef;
  profileImg: string | ArrayBuffer | null =
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg';
  registerForm: FormGroup;
  showPassword: boolean = false;
  error = this.store.select(getError);
  isLoading = this.store.select(isLoading);
  isSubmitted: BehaviorSubject<boolean>;
  private formData: FormData | null;

  constructor(public authService: AuthService, private store: Store) {}

  ngOnInit() {
    this.isSubmitted = new BehaviorSubject(false);
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(REGEX.emailCheck),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.checkPassword,
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        this.checkUsername,
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        this.checkUsername,
      ]),
      address: new FormControl(null),
      avatar: new FormControl(null),
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
  onSelectedValue(address: any) {
    this.registerForm.patchValue({ address });
  }
  onFileSelected(event: any) {
    const [file]: File[] = Array.from(event.target?.files);
    if (file) {
      this.formData = new FormData();
      const fileName = `${this.registerForm.get('lastName')?.value}_${
        file.name
      }`;
      const fileReader = new FileReader();
      fileReader.addEventListener(
        'load',
        () => {
          this.profileImg = fileReader.result;
        },
        false
      );

      fileReader.readAsDataURL(file);
      this.registerForm.patchValue({ avatar: fileName });
      this.formData.append(fileName, file);
    }
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    if (this.formData) {
      this.store.dispatch(USER_ACTIONS.uploadImages({ image: this.formData }));
    }

    const email = formData.value.email;
    const password = formData.value.password;
    const firstName = formData.value.firstName;
    const lastName = formData.value.lastName;
    const address = formData.value.address;
    const avatar = formData.value.avatar;

    this.store.dispatch(
      USER_ACTIONS.submitCredentials({
        email,
        password,
        firstName,
        lastName,
        address,
        avatar,
      })
    );

    this.isSubmitted.next(formDirective.submitted);
    this.autocomplete.nativeElement.firstChild.querySelector('input').value =
      '';
    formDirective.resetForm();
    this.registerForm.reset();
  }
}

@Component({
  template: '',
  standalone: true,
})
export class DialogRegister {
  constructor(
    public dialog: MatDialog,
    // private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dialog.open(RegisterComponent, {
      minWidth: '400px',
      minHeight: '300px',
    });
  }
  // openDialog(): void {
  //   this.dialog
  //     .open(RegisterComponent, {
  //       title: 'Create an account',
  //     })
  //     .subscribe(() => {
  //       this.router.navigate(['../'], { relativeTo: this.route });
  //     });
  // }
}
