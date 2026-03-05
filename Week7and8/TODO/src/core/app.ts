import { TodoService } from '../services/TodoService.js';
import { Todo } from '../models/models.js';

// Persistence logic
const STORAGE_KEY = 'my_todos';
function loadTodos(): Todo[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}
function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// State
let service = new TodoService(loadTodos());
let currentFilter: 'all' | 'active' | 'completed' = 'all';

// DOM Elements
const form = document.getElementById('todo-form') as HTMLFormElement;
const input = document.getElementById('todo-input') as HTMLInputElement;
const categoryInput = document.getElementById('category-input') as HTMLInputElement;
const list = document.getElementById('todo-list') as HTMLUListElement;
const filterButtons = document.querySelectorAll('.nav-btn');
const viewTitle = document.getElementById('view-title') as HTMLHeadingElement;
const emptyState = document.getElementById('empty-state') as HTMLDivElement;

// Render Function
function render() {
  list.innerHTML = '';
  const todosToRender = service.getFilteredTodos(currentFilter);

  // Handle Empty State visibility
  if (todosToRender.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  todosToRender.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    
    li.innerHTML = `
      <div class="task-info">
        <button class="checkbox-btn" data-id="${todo.id}">✔</button>
        <span class="category-badge">${todo.category}</span>
        <span class="task-title">${todo.title}</span>
      </div>
      <button class="delete-btn" data-id="${todo.id}">🗑</button>
    `;
    list.appendChild(li);
  });

  saveTodos(service.getTodos());
}

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;
  
  const category = categoryInput.value.trim() || 'General';
  service = service.addTodo(input.value, category);
  
  input.value = '';
  categoryInput.value = ''; // clear category too
  render();
});

list.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const id = target.getAttribute('data-id');
  if (!id) return;

  if (target.classList.contains('checkbox-btn')) {
    service = service.toggleTodo(id);
    render();
  }
  
  if (target.classList.contains('delete-btn')) {
    service = service.deleteTodo(id);
    render();
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLButtonElement;
    currentFilter = target.getAttribute('data-filter') as 'all' | 'active' | 'completed';
    
    // Update active class styling in the sidebar
    filterButtons.forEach(b => b.classList.remove('active'));
    target.classList.add('active');

    // Update the main header title based on selection
    viewTitle.textContent = target.textContent?.trim() || 'Tasks';
    
    render();
  });
});

// Initial Render
render();