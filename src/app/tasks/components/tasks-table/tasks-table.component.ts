import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TasksService } from '../../../shared/services/tasks.service';
import { PopupService } from 'src/app/shared/services/popups/popup.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/popups/delete/delete.component';
// import { ITaskToEdit } from '../interfaces/itask-to-edit';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
})
export class TasksTableComponent implements OnInit {
  @Input() user!: string;
  @Input() filterByUser!: string;
  column: string = 'both';

  allTasks: ITask[] = [];
  filteredTasks!: ITask[];
  selectedId!: string;
  mode!: string;
  newTitle!: string;
  newTxt!: string;

  constructor(
    private tasksService: TasksService,
    private popupService: PopupService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tasksService.getAllTasks().subscribe((reTasks) => {
      this.allTasks = reTasks;
      this.filteredTasks = this.allTasks;
    });
  }

  ngOnChanges(changes: any): void {
    // let toFilter: string = changes['filterByUser'].currentValue
    // if (toFilter !== undefined) this.filteredTasks = this.filterTasks(toFilter, this.allTasks, 'both')
  }

  filterTasks(user: string, tasks: ITask[], column: string): ITask[] {
    let filtered: ITask[] = tasks.filter((task) => {
      switch (column) {
        case 'from':
          return user === task.from;
        case 'to':
          return user === task.to;
        case 'both':
          return user === task.from || user === task.to;
        default:
          return false;
      }
    });
    return filtered;
  }

  selectFrom(): void {
    this.column = 'from';
    this.filteredTasks = this.filterTasks(
      this.user,
      this.allTasks,
      this.column
    );
  }

  selectTo(): void {
    this.column = 'to';
    this.filteredTasks = this.filterTasks(
      this.user,
      this.allTasks,
      this.column
    );
  }

  selectBoth(): void {
    this.column = 'both';
    this.filteredTasks = this.filterTasks(
      this.user,
      this.allTasks,
      this.column
    );
  }

  viewAll(): void {
    this.filteredTasks = this.allTasks;
  }

  markAsDone(event: any): void {
    console.log(event);
    let taskId: string = event.target.parentElement.id.split('-')[1];
    this.tasksService.getTaskById(taskId).subscribe((task) => {
      task.status = 'done';
      this.tasksService.ediTask(task);
      this.allTasks.map((task) => {
        if (task.id === taskId) task.status = 'done';
      });
      this.filteredTasks.map((task) => {
        if (task.id === taskId) task.status = 'done';
      });
    });
  }

  deleteTask(event: any) {
    if (this.mode != 'edit') {
      let taskToDelete: string = event.target.parentElement.id.split('-')[1];
      this.openDialog(taskToDelete);
    } else {
      this.mode = '';
      this.selectedId = '';
    }
  }

  confirmDelete(id: string) {
    let taskId: string = id;
    this.tasksService.deleteTask(taskId);
    this.allTasks = this.allTasks.filter((task) => {
      return task.id !== taskId;
    });
    this.filteredTasks = this.filteredTasks.filter((task) => {
      return task.id !== taskId;
    });
  }

  showEdit(event: any, task: ITask): void {
    if (event.target.parentElement.id.split('-')[1] != this.selectedId) {
      this.newTitle = task.title;
      this.newTxt = task.taskTxt;
      this.mode = 'edit';
      this.selectedId = event.target.parentElement.id.split('-')[1];
    } else if (this.mode == 'edit') {
      [task.title, task.taskTxt] = this.editTask({
        taskTitle: this.newTitle,
        taskTxt: this.newTxt,
        taskId: task.id,
      });
    }
  }

  editTask(taskObj: any): string[] {
    const { taskTitle, taskTxt, taskId } = taskObj;
    this.tasksService.getTaskById(taskId).subscribe((task) => {
      task.title = taskTitle;
      task.taskTxt = taskTxt;
      this.tasksService.ediTask(task);
      this.allTasks.map((task) => {
        if (task.id === taskId) task.taskTxt = taskTxt;
      });
      this.filteredTasks.map((task) => {
        if (task.id === taskId) task.taskTxt = taskTxt;
      });
    });
    this.selectedId = '';
    return [taskTitle, taskTxt];
  }

  openDialog(id: string): void {
    this.dialog.open(DeleteComponent, { data: { id: id } });
  }
}
