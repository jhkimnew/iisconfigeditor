
import { TodoService } from './unittest-service.service';
import { OnInit } from '@angular/core';

export class TodosComponent implements OnInit {
  todos: any[] = [];
  message: any;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodos().subscribe(t => this.todos = t);
  }

  add() {
    const newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      (t: any) => this.todos.push(t),
      (err: any) => this.message = err);
  }

  delete(id: any) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe();
    }
  }
}
