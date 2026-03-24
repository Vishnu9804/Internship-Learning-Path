export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  dueDate: string | null;
}

export interface UserProfile {
  points: number;
  streak: number;
  lastActiveDate: string | null;
  streakFreezes: number;
  history: Record<string, number>;
}

export interface LevelConfig {
  title: string;
  minPoints: number;
}

export const LEVELS: LevelConfig[] = [
  { title: 'Task Lord', minPoints: 1500 },
  { title: 'Productivity Ninja', minPoints: 501 },
  { title: 'Task Padawan', minPoints: 101 },
  { title: 'Procrastinator', minPoints: 0 }
];