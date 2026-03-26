import { Component, inject, signal, computed } from '@angular/core';
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

  // --- NEW FEATURES STATE ---
  currentFilter = signal<'All' | Priority>('All');
  showRules = signal(false);

  // Automatically recalculates the list whenever the filter or tasks change
  filteredTasks = computed(() => {
    const tasks = this.taskService.tasks();
    const filter = this.currentFilter();
    
    if (filter === 'All') return tasks;
    return tasks.filter(task => task.priority === filter);
  });

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

  // --- NEW FEATURE METHODS ---
  updateFilter(event: Event) {
    this.currentFilter.set((event.target as HTMLSelectElement).value as 'All' | Priority);
  }

  toggleRules() {
    this.showRules.set(!this.showRules());
  }

  submitTask() {
    this.taskService.addTask(this.newTaskTitle(), this.newTaskPriority(), this.newTaskDueDate());
    
    // Reset inputs after submission
    this.newTaskTitle.set('');
    this.newTaskDueDate.set(null); 
  }

  // Determines if a task's due date is older than today
  isOverdue(dueDate: string | null): boolean {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to midnight
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0); // Normalize task date to midnight
    return taskDate < today;
  }
}