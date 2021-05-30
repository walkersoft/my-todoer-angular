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
    let mode = this.processNew ? "add new" : "edit exising";
    console.log("processing... " + mode);

    if (this.taskDescription === "") return;

    if (this.processNew) {
      let task = {
        name: this.taskDescription,
        completed: false,
        bleedOverCount: 0
      }

      this.todaysTasks.items.push(task);
      this.taskDescription = "";
    } else {
      this.editingTask.name = this.taskDescription;
      this.faInputIcon = faPlusSquare;
      this.taskDescription = "";
    }

    this.processNew = true;
  }

  updateTask(task: TaskItem) {
    this.processNew = false;
    this.editingTask = task;
    this.taskDescription = this.editingTask.name;
    this.faInputIcon = faEdit;
  }

}


/* {
  name: "Do the dishes",
  completed: false,
  bleedOverCount: 0
},
{
  name: "Watch three Tim Corey vids for TimCo manager project",
  completed: true,
  bleedOverCount: 1
},
{
  name: "Work on this app",
  completed: false,
  bleedOverCount: 2
}, */
