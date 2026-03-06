import { TodoService } from '../src/services/TodoService.js';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  test('should add a todo immutably', () => {
    const newService = service.addTodo('Learn TS', 'Study');
    expect(service.getTodos().length).toBe(0); // Original stays empty
    expect(newService.getTodos().length).toBe(1); // New state has 1
    expect(newService.getTodos()[0].title).toBe('Learn TS');
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

  test('should return unique categories using Set', () => {
    let s = service.addTodo('Task 1', 'Work');
    s = s.addTodo('Task 2', 'Work');
    s = s.addTodo('Task 3', 'Personal');

    const categories = s.getUniqueCategories();
    expect(categories.size).toBe(2);
    expect(categories.has('Work')).toBe(true);
  });

  test('should group todos by category using Map', () => {
    let s = service.addTodo('Task 1', 'Work');
    s = s.addTodo('Task 2', 'Personal');

    const map = s.getTodosByCategory();
    expect(map.get('Work')?.length).toBe(1);
    expect(map.get('Personal')?.length).toBe(1);
  });

  test('should perfectly filter todos by their active or completed status', () => {
    //Mock Date.now() to ensure the two tasks get completely unique IDs
    jest.spyOn(Date, 'now')
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(2000);

    let s = service.addTodo('Task 1', 'Work');
    s = s.addTodo('Task 2', 'Personal');

    jest.restoreAllMocks();

    const task1Id = s.getTodos()[0].id;
    s = s.toggleTodo(task1Id); 

    const allTodos = s.getFilteredTodos('all');
    expect(allTodos.length).toBe(2);

    const completedTodos = s.getFilteredTodos('completed');
    expect(completedTodos.length).toBe(1);
    expect(completedTodos[0].title).toBe('Task 1');
    expect(completedTodos[0].completed).toBe(true);

    const activeTodos = s.getFilteredTodos('active');
    expect(activeTodos.length).toBe(1);
    expect(activeTodos[0].title).toBe('Task 2'); 
    expect(activeTodos[0].completed).toBe(false);
  });
});