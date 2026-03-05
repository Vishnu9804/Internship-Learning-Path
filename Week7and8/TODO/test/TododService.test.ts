import { TodoService } from '../src/services/TodoService.js';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => { service = new TodoService(); });

  test('should add a todo immutably', () => {
    const newService = service.addTodo('Learn TS', 'Study');
    expect(service.getTodos().length).toBe(0); 
    expect(newService.getTodos().length).toBe(1); 
  });

  test('should toggle a todo status', () => {
    let s = service.addTodo('Test', 'Work');
    const id = s.getTodos()[0].id;
    s = s.toggleTodo(id);
    expect(s.getTodos()[0].completed).toBe(true);
  });

  test('should delete a todo', () => {
    let s = service.addTodo('Test', 'Work');
    const id = s.getTodos()[0].id;
    s = s.deleteTodo(id);
    expect(s.getTodos().length).toBe(0);
  });
});