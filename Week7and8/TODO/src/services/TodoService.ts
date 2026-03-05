import { Todo } from '../models/models.js';

export class TodoService {
  private readonly todos: readonly Todo[];

  constructor(initialTodos: Todo[] = []) {
    this.todos = initialTodos;
  }

  // Service to add TODO
  addTodo(title: string, category: string): TodoService {
    const newTodo: Todo = { 
      id: Date.now().toString(), 
      title, 
      completed: false, 
      category 
    };
    return new TodoService([...this.todos, newTodo]);
  }

  // Service to get TODO
  getTodos(): Todo[] {
    return [...this.todos];
  }
}