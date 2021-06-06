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
    if (task.name === this.currentTask.name) {
      this.storeItems[0] = this.currentTask;
    } else {
      this.storeItems.unshift(task);
      console.log(this.storeItems);
    }

    this.persistStore();
  }
}
