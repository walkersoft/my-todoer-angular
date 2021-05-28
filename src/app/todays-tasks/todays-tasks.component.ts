import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TaskList } from './TaskList';

@Component({
  selector: 'mt-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.css']
})
export class TodaysTasksComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  todaysTasks: TaskList = {
    "day": new Date(),
    "name": Date.now.toString(),
    "items": [
      {
        "name": "Do the dishes",
        "completed": false,
        "bleedOverCount": 0
      },
      {
        "name": "Watch three Tim Corey vids for TimCo manager project",
        "completed": true,
        "bleedOverCount": 1
      },
      {
        "name": "Work on this app",
        "completed": false,
        "bleedOverCount": 2
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
