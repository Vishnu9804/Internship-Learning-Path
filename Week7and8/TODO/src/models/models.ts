export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly category: string;
  readonly dueDate: string;
  readonly completedDate?: string;
}