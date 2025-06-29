import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Router } from "@angular/router";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { Registration } from "../register/register.page";

export type Login = {
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonInput, IonItem, ReactiveFormsModule, RouterModule]
})
export class LoginPage {
  protected loginForm = new FormGroup({
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

  public onLogin(): void {
    const loginValue: Login = this.loginForm.value as Login;
    const storedUser = localStorage.getItem('user');
  
    if (!storedUser) {
      alert('Aucun utilisateur enregistré.');
      return;
    }
  
    const User = JSON.parse(storedUser);
  
    if (
     User.email === loginValue.email &&
     User.password === loginValue.password
    ) {
      this.router.navigateByUrl('/home');
    } else {
      alert('Email ou mot de passe incorrect');
    }
  }
  
}
