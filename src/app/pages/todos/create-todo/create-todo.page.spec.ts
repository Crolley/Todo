import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTodoPage } from './create-todo.page';

describe('CreateTodoPage', () => {
  let component: CreateTodoPage;
  let fixture: ComponentFixture<CreateTodoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
