import { Injectable } from '@angular/core';
import { TaskList } from '../todays-tasks/TaskList';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  test: TaskList = {
    day: new Date(),
    name: "",
    items: [
      {
        name: "Do the dishes",
        completed: false,
        bleedOverCount: 0
      },
      {
        name: "Read a book",
        completed: true,
        bleedOverCount: 1
      },
      {
        name: "Watch 3 Tim Corey videos on TimCo manager",
        completed: false,
        bleedOverCount: 2
      },
      {
        name: "Laundry",
        completed: true,
        bleedOverCount: 0
      },
    ]
  }
}
