import { TodoService } from '../src/services/TodoService.js';
import { Todo } from '../src/models/models.js';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  test('should initialize with an empty array by default', () => {
    expect(service.getTodos().length).toBe(0);
  });

  test('should initialize with existing todos if provided', () => {
    const initialTodos: Todo[] = [
      { id: '123', title: 'Existing Task', category: 'Work', completed: false, dueDate: '2024-12-31' }
    ];
    const newService = new TodoService(initialTodos);
    expect(newService.getTodos().length).toBe(1);
    expect(newService.getTodos()[0].title).toBe('Existing Task');
  });

  test('should add a todo immutably with a due date', () => {
    const newService = service.addTodo('Learn TS', 'Study', '2024-12-31');
    expect(service.getTodos().length).toBe(0); 
    expect(newService.getTodos().length).toBe(1); 
    
    const addedTodo = newService.getTodos()[0];
    expect(addedTodo.title).toBe('Learn TS');
    expect(addedTodo.category).toBe('Study');
    expect(addedTodo.dueDate).toBe('2024-12-31');
    expect(addedTodo.completed).toBe(false);
  });

  test('should toggle a todo status and accurately set completedDate', () => {
    let s = service.addTodo('Test', 'Work', '2024-12-31');
    const id = s.getTodos()[0].id;
    
    s = s.toggleTodo(id);
    const completedTodo = s.getTodos()[0];
    expect(completedTodo.completed).toBe(true);
    expect(completedTodo.completedDate).toBeDefined(); 

    
    s = s.toggleTodo(id);
    const activeTodo = s.getTodos()[0];
    expect(activeTodo.completed).toBe(false);
    expect(activeTodo.completedDate).toBeUndefined(); 
  });

  test('should not mutate anything if toggling a non-existent todo id', () => {
    let s = service.addTodo('Test', 'Work', '2024-12-31');
    s = s.toggleTodo('non-existent-id');
    expect(s.getTodos()[0].completed).toBe(false); 
  });

  test('should delete a todo', () => {
    let s = service.addTodo('Test', 'Work', '2024-12-31');
    const id = s.getTodos()[0].id;
    
    s = s.deleteTodo(id);
    expect(s.getTodos().length).toBe(0);
  });

  test('should return unique categories using Set', () => {
    let s = service.addTodo('Task 1', 'Work', '2024-12-31');
    s = s.addTodo('Task 2', 'Work', '2025-01-01');
    s = s.addTodo('Task 3', 'Personal', '2025-01-02');

    const categories = s.getUniqueCategories();
    expect(categories.size).toBe(2);
    expect(categories.has('Work')).toBe(true);
    expect(categories.has('Personal')).toBe(true);
  });

  test('should group todos by category using Map', () => {
    let s = service.addTodo('Task 1', 'Work', '2024-12-31');
    s = s.addTodo('Task 2', 'Work', '2025-01-01'); 
    s = s.addTodo('Task 3', 'Personal', '2025-01-02');

    const map = s.getTodosByCategory();
    expect(map.get('Work')?.length).toBe(2);
    expect(map.get('Personal')?.length).toBe(1);
  });

  test('should perfectly filter todos by their active or completed status', () => {
    jest.spyOn(Date, 'now')
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(2000);

    let s = service.addTodo('Task 1', 'Work', '2024-12-31');
    s = s.addTodo('Task 2', 'Personal', '2025-01-01');

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