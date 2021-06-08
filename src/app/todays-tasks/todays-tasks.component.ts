import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataStorageService } from '../services/data-storage.service';
import { MyTaskList } from './MyTaskList';
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


  //modal reference for new task list/existing task list dialogs
  modalRef!: BsModalRef;

  //misc bits to help with task management
  taskDescription: string = "";
  processNew: boolean = true;
  taskCount: number = 0;
  completeCount: number = 0;
  editingTaskIndex: number = -1;
  editingTask!: TaskItem;
  deletingTaskIndex: number = -1;

  todaysTasks: MyTaskList;

  constructor(private storage: DataStorageService, private modalService: BsModalService) {
    this.todaysTasks = storage.getLatestTask();
  }

  ngOnChanges(): void {
    this.updateTaskTallies();
  }

  ngOnInit(): void {
    this.updateTaskTallies();
    this.todaysTasks = this.storage.getLatestTask();
    this.todaysTasks.name = "Tasks for: " + this.todaysTasks.day.toLocaleDateString("en-US", {month: "long", day: "numeric", year: 'numeric'});
  }

  updateTaskTallies() {
    this.taskCount = this.todaysTasks.items.length;
    this.completeCount = this.todaysTasks.items.filter((t) => t.completed).length;
    this.storage.saveTaskList(this.todaysTasks);
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
    this.storage.saveTaskList(this.todaysTasks);
  }

  resetTaskEditing() {
    this.processNew = true;
    this.editingTaskIndex = -1;
    this.taskDescription = "";
    this.faInputIcon = faPlusSquare;
  }

  createNewList(confirmExistingModal: TemplateRef<any>, confirmNewModal: TemplateRef<any>): void {
    //Need to look into the ngx-bootstrap modal docs more and see how to reference a modal in the
    //template directly into the component.  I don't like passing in multiple modal references, but
    //I don't like having no solution more, so there's that...
    let newTask = new MyTaskList();

    if (newTask.name === this.todaysTasks.name) {
      this.modalRef = this.modalService.show(confirmExistingModal);
    } else {
      this.modalRef = this.modalService.show(confirmNewModal);
    }
  }

  confirmNewList(): void {
    let newTask = new MyTaskList();

    //hopefully this bit never runs...
    if (newTask.name === this.todaysTasks.name) {
      console.error("ERROR: A list for today already exists. (This should've been caught before trying to create a new list!)");
      return;
    }

    //iterate over current tasks looking for incomplete tasks and updating their miss
    //counters before pushing them into the next days tasks
    this.todaysTasks.items.forEach(t => {
      let clone = {...t};
      if (!clone.completed) {
        clone.bleedOverCount++;
        newTask.items.push(clone);
      }
    });

    //update the data store and component data
    this.storage.saveTaskList(newTask);
    this.todaysTasks = this.storage.getLatestTask();
    this.updateTaskTallies();

    //hide the modal that triggered this task
    this.modalRef.hide();
  }
}
