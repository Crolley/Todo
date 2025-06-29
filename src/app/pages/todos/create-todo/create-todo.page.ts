import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
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
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class CreateTodoPage {
  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  onCreate(): void {
    const formValue = this.todoForm.value;
    const newTodo: Todo = {
      id: Date.now(),
      title: formValue.title ?? '',
      description: formValue.description ?? '',
      done: false,
    };

    const existing = JSON.parse(localStorage.getItem('todos') || '[]');
    existing.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(existing));

    this.router.navigateByUrl('/todos');
  }
}
