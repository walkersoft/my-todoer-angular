import { Component, Input, OnInit } from '@angular/core';
import { faPlusSquare, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DataStorageService } from '../services/data-storage.service';
import { ChecklistItem } from './ChecklistItem';

@Component({
  selector: 'mt-lists',
  templateUrl: './lists.component.html',
  styles: [
  ]
})
export class ListsComponent implements OnInit {

  @Input() itemDescription: string = "";

  //font awesome stuff
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faInputIcon = faPlusSquare;

  checklist: ChecklistItem[] = [];
  itemCount: number = 0;
  completeCount: number = 0;
  editingItemIndex: number = -1;
  deletingItemIndex: number = -1;
  processNew: boolean = true;
  editingItem!: ChecklistItem;

  constructor(private storage: DataStorageService) { }

  ngOnInit(): void {
    this.checklist = this.storage.getCheckListData();
  }

  processItemInput(): void {
    if (this.itemDescription === "") return;

    const item = {
      name: this.itemDescription,
      completed: false,
    }

    if (this.processNew) {
      this.checklist.push(item);
    } else {
      this.editingItem.name = this.itemDescription;
    }

    this.resetItemEditing();
    this.updateItemTallies();
  }

  updateItemTallies() {
    this.itemCount = this.checklist.length;
    this.completeCount = this.checklist.filter((t) => t.completed).length;
    this.storage.saveCheckList(this.checklist);
  }

  removeItem() {
    this.checklist.splice(this.deletingItemIndex, 1);
    this.deletingItemIndex = -1;
    this.resetItemEditing();
    this.updateItemTallies();
    this.storage.saveCheckList(this.checklist);
  }

  resetItemEditing() {
    this.processNew = true;
    this.editingItemIndex = -1;
    this.itemDescription = "";
    this.faInputIcon = faPlusSquare;
  }

  updateItem(item: ChecklistItem): void {
    this.processNew = false;
    this.editingItem = item;
    this.itemDescription = this.editingItem.name;
    this.faInputIcon = faEdit;
  }

  clearList(): void {
    this.checklist = [];
    this.updateItemTallies();
    this.resetItemEditing();
  }
}
