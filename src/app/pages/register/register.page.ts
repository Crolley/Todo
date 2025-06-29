import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { Router, RouterModule } from "@angular/router";

export type Registration = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    FormsModule,
    IonIcon,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class RegisterPage {
  protected registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  protected typeOfPasswordInput = 'password';
  protected iconOfPasswordInput = 'eye-outline';

  constructor(private router: Router) {
    addIcons({eyeOutline, eyeOffOutline});
  }

  public onTogglePasswordVisibility() {
    if (this.typeOfPasswordInput === 'password') {
      this.iconOfPasswordInput = 'eye-off-outline';
      this.typeOfPasswordInput = 'text';
    } else {
      this.iconOfPasswordInput = 'eye-outline';
      this.typeOfPasswordInput = 'password';
    }
  }

  public onRegister(): void {
    const registrationValue: Registration = this.registerForm.value as Registration;
    localStorage.setItem('user', JSON.stringify(registrationValue));
    this.router.navigateByUrl('/login');
  }

}
