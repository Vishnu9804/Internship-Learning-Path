import { Component, inject, signal } from '@angular/core';
import { TaskService } from './services/task-service';
import { GamificationService } from './services/gamification-service';
import { Priority } from './models/types';
import { HeatmapComponent } from './components/heatmap-component/heatmap-component';

@Component({
  selector: 'app-root',
  imports: [HeatmapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  taskService = inject(TaskService);
  gameEngine = inject(GamificationService);

  newTaskTitle = signal('');
  newTaskPriority = signal<Priority>('Medium');
  newTaskDueDate = signal<string | null>(null);

  updateTitle(event: Event) {
    this.newTaskTitle.set((event.target as HTMLInputElement).value);
  }

  updatePriority(event: Event) {
    this.newTaskPriority.set((event.target as HTMLSelectElement).value as Priority);
  }

  updateDueDate(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newTaskDueDate.set(value ? value : null);
  }

  submitTask() {
    this.taskService.addTask(this.newTaskTitle(), this.newTaskPriority(), this.newTaskDueDate());

    this.newTaskTitle.set('');
    this.newTaskDueDate.set(null); 
  }

  isOverdue(dueDate: string | null): boolean {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0); 
    return taskDate < today;
  }
}