import { TodoService } from '../services/TodoService.js';
// Persistence logic
const STORAGE_KEY = 'my_todos';
function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}
function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
// State
let service = new TodoService(loadTodos());
let currentFilter = 'all';
let currentCategory = 'All Categories';
// DOM Elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const categoryInput = document.getElementById('category-input');
const dueDateInput = document.getElementById('due-date-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.nav-btn');
const viewTitle = document.getElementById('view-title');
const emptyState = document.getElementById('empty-state');
const categoryDropdownBtn = document.getElementById('category-dropdown-btn');
const categoryDropdownList = document.getElementById('category-dropdown-list');
// Render Function
function render() {
    list.innerHTML = '';
    // 1. Filter by Main Status (All/Active/Completed)
    let todosToRender = service.getFilteredTodos(currentFilter);
    // Safety feature
    const uniqueCategories = service.getUniqueCategories();
    if (currentCategory !== 'All Categories' && !uniqueCategories.has(currentCategory)) {
        currentCategory = 'All Categories';
        categoryDropdownBtn.textContent = 'All Categories ▾';
    }
    // 2. Filter by the Dropdown Category selection
    if (currentCategory !== 'All Categories') {
        todosToRender = todosToRender.filter(todo => todo.category === currentCategory);
    }
    // 3. SORT BY DUE DATE (Nearest first, furthest later)
    todosToRender.sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    // Handle Empty State visibility
    if (todosToRender.length === 0) {
        emptyState.classList.remove('hidden');
    }
    else {
        emptyState.classList.add('hidden');
    }
    // Setup current date (ignoring time) to check for overdues
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Render Tasks
    todosToRender.forEach(todo => {
        const li = document.createElement('li');
        // Check if overdue
        const taskDueDate = new Date(todo.dueDate);
        taskDueDate.setHours(0, 0, 0, 0);
        const isOverdue = !todo.completed && taskDueDate < today;
        // Apply classes based on status
        li.className = `task-row ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`;
        // Formulate Date HTML 
        let dateHtml = `<span class="date-badge">📅 ${todo.dueDate}</span>`;
        if (todo.completed && todo.completedDate) {
            const formattedCompletedDate = new Date(todo.completedDate).toLocaleDateString();
            dateHtml += `<span class="date-badge completed-text">✓ Completed on: ${formattedCompletedDate}</span>`;
        }
        else if (isOverdue) {
            dateHtml += `<span class="date-badge overdue-text">⚠️ Overdue</span>`;
        }
        li.innerHTML = `
      <div class="task-info">
        <button class="checkbox-btn" data-id="${todo.id}">✔</button>
        <div class="task-content-wrapper">
          <span class="category-badge">${todo.category}</span>
          <span class="task-title">${todo.title}</span>
          <div class="task-dates">${dateHtml}</div>
        </div>
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
    if (!categoryDropdownBtn.contains(e.target) && !categoryDropdownList.contains(e.target)) {
        categoryDropdownList.classList.add('hidden');
    }
});
// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim() || !dueDateInput.value)
        return;
    const category = categoryInput.value.trim() || 'General';
    service = service.addTodo(input.value, category, dueDateInput.value);
    input.value = '';
    categoryInput.value = '';
    dueDateInput.value = '';
    render();
});
list.addEventListener('click', (e) => {
    const target = e.target;
    const id = target.getAttribute('data-id');
    if (!id)
        return;
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
        const target = e.currentTarget;
        currentFilter = target.getAttribute('data-filter');
        filterButtons.forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        viewTitle.textContent = target.textContent?.trim() || 'Tasks';
        render();
    });
});
// Initial Render
render();
