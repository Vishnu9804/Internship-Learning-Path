import { Injectable, signal, effect } from '@angular/core';
import { Task, Priority } from '../models/types';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY = 'gamified_tasks';
  
  tasks = signal<Task[]>(this.loadTasks());

  constructor() {
    // Auto-save whenever tasks change
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks()));
      }
    });
  }

  addTask(title: string, priority: Priority) {
    if (!title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      completed: false,
      createdAt: Date.now()
    };
    this.tasks.update(t => [newTask, ...t]);
  }

  toggleTaskCompletion(id: string) {
    this.tasks.update(currentTasks => {
      return currentTasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  }

  deleteTask(id: string) {
    this.tasks.update(t => t.filter(task => task.id !== id));
  }

  private loadTasks(): Task[] {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }
}