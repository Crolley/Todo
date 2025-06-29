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
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
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
export class EditTodoPage implements OnInit {
  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  todoId: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.todoId = +params['id']; // Convertir en number
      this.loadTodo();
    });
  }

  loadTodo(): void {
    const stored = localStorage.getItem('todos');
    const todos: Todo[] = stored ? JSON.parse(stored) : [];
    const current = todos.find(t => t.id === this.todoId);

    if (current) {
      this.todoForm.patchValue({
        title: current.title,
        description: current.description,
      });
    } else {
      alert("Tâche introuvable");
      this.router.navigateByUrl('/todos');
    }
  }

  onSave(): void {
    const formValue = this.todoForm.value;
    const stored = localStorage.getItem('todos');
    const todos: Todo[] = stored ? JSON.parse(stored) : [];

    const index = todos.findIndex(t => t.id === this.todoId);
    if (index !== -1) {
      todos[index] = {
        ...todos[index],
        title: formValue.title ?? '',
        description: formValue.description ?? '',
      };

      localStorage.setItem('todos', JSON.stringify(todos));
      this.router.navigateByUrl('/todos');
    }
  }
}
