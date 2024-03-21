import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ITask } from '../shared/interfaces/itask';
import { TasksService } from '../shared/services/tasks.service';
// import { ITaskToEdit } from '../interfaces/itask-to-edit';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
