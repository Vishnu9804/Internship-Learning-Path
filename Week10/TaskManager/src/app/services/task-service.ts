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

  addTask(title: string, priority: Priority, dueDate: string | null) {
    if (!title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      completed: false,
      createdAt: Date.now(),
      dueDate
    };

    this.tasks.update(t => this.sortTasks([newTask, ...t]));
  }

  toggleTaskCompletion(id: string) {
    this.tasks.update(currentTasks => {
      const updated = currentTasks.map(task => {
        if (task.id === id) {
          const newlyCompleted = !task.completed;
          if (newlyCompleted) {
            this.gameEngine.recordTaskCompletion(task.priority);
          } else {

            this.gameEngine.revertTaskCompletion(task.priority);
          }
          return { ...task, completed: newlyCompleted };
        }
        return task;
      });

      return this.sortTasks(updated);
    });
  }

  deleteTask(id: string) {
    this.tasks.update(t => t.filter(task => task.id !== id));
  }

  private loadTasks(): Task[] {

    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return this.sortTasks(JSON.parse(saved));
      }
    }
    return [];
  }


  private sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {

      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      

      return b.createdAt - a.createdAt;
    });
  }
}