import { Injectable } from '@angular/core';
import { MyTaskList } from '../todays-tasks/MyTaskList';
import { TaskList } from '../todays-tasks/TaskList';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private backingStore: Storage = window.localStorage;
  private storeItems: TaskList[] = [];
  private currentTask!: TaskList;

  constructor()  {
    this.loadStore();
    this.getLatestTask();
  }

  private persistStore(): void {
    console.log('saving ...');
    this.backingStore.setItem('data', JSON.stringify(this.storeItems));
  }

  private loadStore(): void {
    const store = this.backingStore.getItem('data');
    if (store !== null) {
      this.storeItems = JSON.parse(store);
    }
    else {
      console.log('store was empty');
    }
  }

  getLatestTask(): TaskList {
    //console.log('current task: ', this.currentTask);
    if (this.storeItems.length > 0) {
      this.currentTask = this.storeItems[0];
      if (typeof(this.currentTask.day) == "string") {
        this.currentTask.day = new Date(this.currentTask.day);
      }
    } else {
      this.currentTask = new MyTaskList();
    }

    return this.currentTask;
  }

  saveTaskList(task: TaskList): void {
    //this.currentTask = task;
    if (task.name === this.currentTask.name) {
      this.storeItems[0] = this.currentTask;
    } else {
      console.log('task names are not the same');
      this.storeItems.unshift(task);
      console.log(this.storeItems);
    }

    this.persistStore();
  }

  // test: TaskList = {
  //   day: new Date(),
  //   name: "",
  //   items: [
  //     {
  //       name: "Do the dishes",
  //       completed: false,
  //       bleedOverCount: 0
  //     },
  //     {
  //       name: "Read a book",
  //       completed: true,
  //       bleedOverCount: 1
  //     },
  //     {
  //       name: "Watch 3 Tim Corey videos on TimCo manager",
  //       completed: false,
  //       bleedOverCount: 2
  //     },
  //     {
  //       name: "Laundry",
  //       completed: true,
  //       bleedOverCount: 0
  //     },
  //   ]
  // }

}
