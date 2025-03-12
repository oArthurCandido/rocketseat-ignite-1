export interface Task {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  alarmDateTime: string | null;
}
