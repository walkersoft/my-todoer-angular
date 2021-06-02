import { TaskItem } from "./TaskItem";
import { TaskList } from "./TaskList";

export class MyTaskList implements TaskList {
  day: Date;
  name: string;
  items: TaskItem[];

  constructor() {
    this.day = new Date();
    this.name = 'Tasks for: ' + this.day.toLocaleDateString("en-US", {month: "long", day: "numeric", year: 'numeric'})
    this.items = [];
  }
}

