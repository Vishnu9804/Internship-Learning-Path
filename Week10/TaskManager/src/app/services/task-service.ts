import { Injectable, signal, effect } from '@angular/core';
import { Task, Priority } from '../models/types';
import { GamificationService } from './gamification-service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY = 'gamified_tasks';
  
  tasks = signal<Task[]>(this.loadTasks());

  constructor(private gameEngine: GamificationService) {
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
          const newlyCompleted = !task.completed;
          if (newlyCompleted) {
            this.gameEngine.recordTaskCompletion(task.priority);
          }
          return { ...task, completed: newlyCompleted };
        }
        return task;
      });
    });
  }

  deleteTask(id: string) {
    this.tasks.update(t => t.filter(task => task.id !== id));
  }

  private loadTasks(): Task[] {
    // Check if we are running in the browser before accessing localStorage
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    
    return [];
  }
}