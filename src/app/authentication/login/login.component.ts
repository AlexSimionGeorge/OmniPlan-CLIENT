import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from "@angular/material/button";

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
  loginFormGroup: FormGroup<{name: FormControl, password: FormControl}> = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(8)]),
  });

  save() {
    console.log("save");
  }
}
