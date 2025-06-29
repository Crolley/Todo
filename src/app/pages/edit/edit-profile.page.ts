import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonButton,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class EditProfilePage implements OnInit {
  protected profileForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      this.profileForm.patchValue({
        firstname: parsed.firstname,
        lastname: parsed.lastname,
      });
    }
  }

  onSave(): void {
    const user = localStorage.getItem('user');
    if (!user) return;

    const current = JSON.parse(user);
    const updated = {
      ...current,
      ...this.profileForm.value,
    };

    localStorage.setItem('user', JSON.stringify(updated));
    this.router.navigateByUrl('/home');
  }
}
