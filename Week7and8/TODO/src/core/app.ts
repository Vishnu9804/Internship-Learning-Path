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
let currentCategory: string = 'All Categories'; // NEW STATE FOR DROPDOWN

// DOM Elements
const form = document.getElementById('todo-form') as HTMLFormElement;
const input = document.getElementById('todo-input') as HTMLInputElement;
const categoryInput = document.getElementById('category-input') as HTMLInputElement;
const list = document.getElementById('todo-list') as HTMLUListElement;
const filterButtons = document.querySelectorAll('.nav-btn');
const viewTitle = document.getElementById('view-title') as HTMLHeadingElement;
const emptyState = document.getElementById('empty-state') as HTMLDivElement;

// NEW: Dropdown Elements
const categoryDropdownBtn = document.getElementById('category-dropdown-btn') as HTMLButtonElement;
const categoryDropdownList = document.getElementById('category-dropdown-list') as HTMLUListElement;

// Render Function
function render() {
  list.innerHTML = '';
  
  // 1. Filter by Main Status (All/Active/Completed)
  let todosToRender = service.getFilteredTodos(currentFilter);

  // Safety feature: If user deleted the last task of a filtered category, reset it to All
  const uniqueCategories = service.getUniqueCategories();
  if (currentCategory !== 'All Categories' && !uniqueCategories.has(currentCategory)) {
    currentCategory = 'All Categories';
    categoryDropdownBtn.textContent = 'All Categories ▾';
  }

  // 2. Filter by the Dropdown Category selection
  if (currentCategory !== 'All Categories') {
    todosToRender = todosToRender.filter(todo => todo.category === currentCategory);
  }

  // Handle Empty State visibility
  if (todosToRender.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  // Render Tasks
  todosToRender.forEach(todo => {
    const li = document.createElement('li');
    // Important: Added 'task-row' class to match new CSS specificity
    li.className = `task-row ${todo.completed ? 'completed' : ''}`;
    
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

  // Render Dropdown List dynamically
  categoryDropdownList.innerHTML = '';
  const categoriesToRender = ['All Categories', ...Array.from(uniqueCategories)];
  
  categoriesToRender.forEach(cat => {
    const li = document.createElement('li');
    li.className = 'dropdown-item';
    li.textContent = cat;
    
    // Highlight the currently selected category in the list
    if (cat === currentCategory) {
      li.style.fontWeight = 'bold';
      li.style.color = 'var(--primary-color)';
    }

    li.addEventListener('click', () => {
      currentCategory = cat;
      categoryDropdownBtn.textContent = `${cat} ▾`;
      categoryDropdownList.classList.add('hidden');
      render();
    });
    categoryDropdownList.appendChild(li);
  });

  saveTodos(service.getTodos());
}

// Dropdown Toggles and click-away listeners
categoryDropdownBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  categoryDropdownList.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  // If the user clicks outside the dropdown container, hide it
  if (!categoryDropdownBtn.contains(e.target as Node) && !categoryDropdownList.contains(e.target as Node)) {
    categoryDropdownList.classList.add('hidden');
  }
});

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

filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLButtonElement;
    currentFilter = target.getAttribute('data-filter') as 'all' | 'active' | 'completed';
    
    filterButtons.forEach(b => b.classList.remove('active'));
    target.classList.add('active');

    viewTitle.textContent = target.textContent?.trim() || 'Tasks';
    render();
  });
});

// Initial Render
render();