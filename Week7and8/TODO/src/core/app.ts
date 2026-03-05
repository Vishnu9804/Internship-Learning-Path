import { TodoService } from '../services/TodoService.js';

// State
let service = new TodoService();

// DOM Elements
const form = document.getElementById('todo-form') as HTMLFormElement;
const input = document.getElementById('todo-input') as HTMLInputElement;
const categoryInput = document.getElementById('category-input') as HTMLInputElement;
const list = document.getElementById('todo-list') as HTMLUListElement;

// Render Function
function render() {
  list.innerHTML = '';
  const todosToRender = service.getTodos();

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
}

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;
  
  const category = categoryInput.value.trim() || 'General';
  service = service.addTodo(input.value, category);
  
  input.value = '';
  categoryInput.value = '';
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

// Initial Render
render();