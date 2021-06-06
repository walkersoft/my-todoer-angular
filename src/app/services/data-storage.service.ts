import { Injectable } from '@angular/core';
import { ChecklistItem } from '../lists/ChecklistItem';
import { MyTaskList } from '../todays-tasks/MyTaskList';
import { TaskList } from '../todays-tasks/TaskList';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private backingStore: Storage = window.localStorage;
  private storeItems: TaskList[] = [];
  private checklistItems: ChecklistItem[] = [];
  private currentTask!: TaskList;

  constructor()  {
    this.loadStore();
    this.getLatestTask();
  }

  private persistStore(): void {
    this.backingStore.setItem('data', JSON.stringify(this.storeItems));
    this.backingStore.setItem('list', JSON.stringify(this.checklistItems));
  }

  private loadStore(): void {
    //load daily task data
    const store = this.backingStore.getItem('data');
    if (store !== null) {
      this.storeItems = JSON.parse(store);
    }

    //load checklist data
    const list = this.backingStore.getItem('list');
    if (list !== null) {
      this.checklistItems = JSON.parse(list);
    }
  }

  getLatestTask(): TaskList {
    if (this.storeItems.length > 0) {
      this.currentTask = this.storeItems[0];
      if (typeof(this.currentTask.day) == "string") {
        //rehydrate property back into a date object
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

  saveCheckList(list: ChecklistItem[]) {
    this.checklistItems = list;
    this.persistStore();
  }

  getCheckListData(): ChecklistItem[] {
    return this.checklistItems;
  }
}
