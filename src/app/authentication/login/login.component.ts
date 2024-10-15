import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {LoginRequestModel} from "../models/login-request.model";
import {Store} from "@ngrx/store";
import {loginRequestAction} from "../../store/authentication-store/authentication.actions";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormGroup: FormGroup<{identifier: FormControl, password: FormControl}> = new FormGroup({
    identifier: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(8)]),
  });

  constructor(private store: Store<any>) { }

  save() {
    const loginRequest: LoginRequestModel = {
      identifier: this.loginFormGroup.controls.identifier.value,
      password: this.loginFormGroup.controls.password.value,
    };

    this.store.dispatch(loginRequestAction({ loginRequest }));
    console.log(loginRequest);
  }
}
