import { TaskItem } from "./TaskItem";

export interface TaskList {
  day: Date;
  name: string;
  items: TaskItem[];
}
