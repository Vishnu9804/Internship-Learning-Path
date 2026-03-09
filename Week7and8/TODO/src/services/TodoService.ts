import { Todo } from '../models/models.js';

export class TodoService {
  private readonly todos: readonly Todo[];

  constructor(initialTodos: Todo[] = []) {
    this.todos = initialTodos;
  }

  // Service to add task (now requires dueDate)
  addTodo(title: string, category: string, dueDate: string): TodoService {
    const newTodo: Todo = { 
      id: Date.now().toString(), 
      title, 
      completed: false, 
      category,
      dueDate
    };
    return new TodoService([...this.todos, newTodo]);
  }

  // Service for toggle the Task for complete (adds completedDate)
  toggleTodo(id: string): TodoService {
    const updated = this.todos.map(todo => {
      if (todo.id === id) {
        const isCompleted = !todo.completed;
        return { 
          ...todo, 
          completed: isCompleted,
          completedDate: isCompleted ? new Date().toISOString() : undefined
        };
      }
      return todo;
    });
    return new TodoService(updated);
  }

  // Service for delete the task
  deleteTodo(id: string): TodoService {
    const filtered = this.todos.filter(todo => todo.id !== id);
    return new TodoService(filtered);
  }

  // Service to get TODO
  getTodos(): Todo[] {
    return [...this.todos];
  }

  // Task Categories
  getUniqueCategories(): Set<string> {
    return new Set(this.todos.map(todo => todo.category));
  }

  // Categories filtering
  getTodosByCategory(): Map<string, Todo[]> {
    const map = new Map<string, Todo[]>();
    this.todos.forEach(todo => {
      const current = map.get(todo.category) || [];
      map.set(todo.category, [...current, todo]);
    });
    return map;
  }

  //Filter based on status
  getFilteredTodos(filter: 'all' | 'active' | 'completed'): Todo[] {
    if (filter === 'active') return this.todos.filter(t => !t.completed);
    if (filter === 'completed') return this.todos.filter(t => t.completed);
    return [...this.todos];
  }
}