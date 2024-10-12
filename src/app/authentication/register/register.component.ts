import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {PasswordValidator} from "../validators/PasswordValidator";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RegisterRequestModel} from "../models/register-request.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/root.state";
import {registerRequestAction} from "../../store/authentication-store/authentication.actions";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerFormGroup: FormGroup<{
    username: FormControl,
    email: FormControl,
    password: FormControl,
    confirmPassword: FormControl,
  }> = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      email:new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {validators:PasswordValidator} as  AbstractControlOptions);

  usernameAvailable: boolean | null = null;
  emailAvailable: boolean | null = null;

  constructor(private store: Store<AppState>, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.registerFormGroup.controls.username.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.authenticationService.checkFieldAvailability('username', value))
    ).subscribe(result => {
      this.usernameAvailable = result;
      this.registerFormGroup.controls.username.setErrors(result ? null : { usernameTaken: true });
    });

    this.registerFormGroup.controls.email.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.authenticationService.checkFieldAvailability('email', value))
    ).subscribe(result => {
      this.emailAvailable = result;
      this.registerFormGroup.controls.email.setErrors(result ? null : { emailTaken: true });
    });
  }

  register() {
    const registerRequest: RegisterRequestModel = {
      username: this.registerFormGroup.controls.username.value,
      email: this.registerFormGroup.controls.email.value,
      password: this.registerFormGroup.controls.password.value,
      confirmPassword: this.registerFormGroup.controls.confirmPassword.value,
    };

    this.store.dispatch(registerRequestAction({ registerRequest }));
  }
}
