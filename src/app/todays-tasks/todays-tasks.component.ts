import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { TaskItem } from './TaskItem';
import { TaskList } from './TaskList';

@Component({
  selector: 'mt-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.css']
})
export class TodaysTasksComponent implements OnInit, OnChanges {

  //font-awesomes in component
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faInputIcon = faPlusSquare;

  taskDescription: string = "";
  processNew: boolean = true;

  taskCount: number = 0;
  completeCount: number = 0;
  editingTaskIndex: number = -1;
  editingTask!: TaskItem;
  deletingTaskIndex: number = -1;

  todaysTasks: TaskList = {
    day: new Date(),
    name: "",
    items: [
    ]
  };

  constructor() { }
  ngOnChanges(): void {
    this.updateTaskTallies();
  }

  ngOnInit(): void {
    this.updateTaskTallies();
    this.todaysTasks.name = "Tasks for: " + this.todaysTasks.day.toLocaleDateString("en-US", {month: "long", day: "numeric", year: 'numeric'});
  }

  updateTaskTallies() {
    this.taskCount = this.todaysTasks.items.length;
    this.completeCount = this.todaysTasks.items.filter((t) => t.completed).length;
  }

  processTaskInput(): void {
    if (this.taskDescription === "") return;

    const task = {
      name: this.taskDescription,
      completed: false,
      bleedOverCount: 0
    }

    if (this.processNew) {
      this.todaysTasks.items.push(task);
    } else {
      this.editingTask.name = this.taskDescription;
    }

    this.resetTaskEditing();
    this.updateTaskTallies();
  }

  updateTask(task: TaskItem) {
    this.processNew = false;
    this.editingTask = task;
    this.taskDescription = this.editingTask.name;
    this.faInputIcon = faEdit;
  }

  removeTask() {
    this.todaysTasks.items.splice(this.deletingTaskIndex, 1);
    this.deletingTaskIndex = -1;
    this.resetTaskEditing();
    this.updateTaskTallies();
  }

  resetTaskEditing() {
    this.processNew = true;
    this.editingTaskIndex = -1;
    this.taskDescription = "";
    this.faInputIcon = faPlusSquare;
  }

}
