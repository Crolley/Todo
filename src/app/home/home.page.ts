import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterModule
  ],
})
export class HomePage implements OnInit {
  userFirstname: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      this.userFirstname = parsed.firstname ?? '';
    }
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}
