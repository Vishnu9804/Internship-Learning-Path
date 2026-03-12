export class TodoService {
    constructor(initialTodos = []) {
        this.todos = initialTodos;
    }
    // Service to add task
    addTodo(title, category, dueDate) {
        const newTodo = {
            id: Date.now().toString(),
            title,
            completed: false,
            category,
            dueDate,
            notified: false // explicitly start as not notified
        };
        return new TodoService([...this.todos, newTodo]);
    }
    // Service for toggle the Task for complete
    toggleTodo(id) {
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
    deleteTodo(id) {
        const filtered = this.todos.filter(todo => todo.id !== id);
        return new TodoService(filtered);
    }
    // NEW: Mark task as notified immutably
    markAsNotified(id) {
        const updated = this.todos.map(todo => todo.id === id ? { ...todo, notified: true } : todo);
        return new TodoService(updated);
    }
    // Service to get TODO
    getTodos() {
        return [...this.todos];
    }
    // Task Categories
    getUniqueCategories() {
        return new Set(this.todos.map(todo => todo.category));
    }
    // Categories filtering
    getTodosByCategory() {
        const map = new Map();
        this.todos.forEach(todo => {
            const current = map.get(todo.category) || [];
            map.set(todo.category, [...current, todo]);
        });
        return map;
    }
    //Filter based on status
    getFilteredTodos(filter) {
        if (filter === 'active')
            return this.todos.filter(t => !t.completed);
        if (filter === 'completed')
            return this.todos.filter(t => t.completed);
        return [...this.todos];
    }
}
