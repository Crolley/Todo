import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonList,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonList,
    CommonModule,
    RouterModule,
  ],
})
export class TodosPage implements OnInit {
  public todos: Todo[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTodos(); 
  }

  ionViewWillEnter(): void {
    this.loadTodos(); 
  }

  loadTodos(): void {
    const stored = localStorage.getItem('todos');
    this.todos = stored ? JSON.parse(stored) : [];
  }

  toggleDone(todo: Todo): void {
    todo.done = !todo.done;
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
  }

  editTodo(id: number): void {
    this.router.navigate(['/edit-todo'], { queryParams: { id } });
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
