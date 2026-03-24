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

  updateTitle(event: Event) {
    this.newTaskTitle.set((event.target as HTMLInputElement).value);
  }

  updatePriority(event: Event) {
    this.newTaskPriority.set((event.target as HTMLSelectElement).value as Priority);
  }

  submitTask() {
    this.taskService.addTask(this.newTaskTitle(), this.newTaskPriority());
    this.newTaskTitle.set('');
  }
}