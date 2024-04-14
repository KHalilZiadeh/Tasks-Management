import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TasksService } from '../../../shared/services/tasks.service';
import { PopupService } from 'src/app/shared/services/popups/popup.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/popups/delete/delete.component';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
})
export class TasksTableComponent implements OnInit {
  user!: string;
  @Input() filterByUser!: string;
  column: string = 'both';

  allTasks: ITask[] = [];
  tasksToShow!: ITask[];
  selectedId!: string;
  mode!: string;
  newTitle!: string;
  newTxt!: string;
  tasksLength!: number;
  pageLength: number = 5;
  pageIndex: number = 1;

  constructor(
    private tasksService: TasksService,
    private popupService: PopupService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('taskUser')!).authUser;
    this.tasksService.getTasksbypage(this.pageIndex, this.pageLength).subscribe(reTasks => {
      this.tasksToShow = reTasks.data;
      this.tasksLength = reTasks.items;
    });

    this.tasksService.filteredUsers$.subscribe((newValeus) => {
      this.tasksToShow = this.showFiltered(newValeus);
    });
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
    this.tasksToShow = this.filterTasks(this.user, this.allTasks, this.column);
  };

  selectTo(): void {
    this.column = 'to';
    this.tasksToShow = this.filterTasks(this.user, this.allTasks, this.column);
  };

  selectBoth(): void {
    this.column = 'both';
    this.tasksToShow = this.filterTasks(this.user, this.allTasks, this.column);
  };

  viewAll(): void {
    this.tasksToShow = this.allTasks;
  };

  markAsDone(event: any): void {
    let taskId: string = event.target.parentElement.id.split('-')[1];
    this.tasksService.getTaskById(taskId).subscribe((task) => {
      task.status = 'done';
      this.tasksService.ediTask(task);
      this.allTasks.map((task) => {
        if (task.id === taskId) task.status = 'done';
      });
      this.tasksToShow.map((task) => {
        if (task.id === taskId) task.status = 'done';
      });
    });
  };

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
    this.tasksToShow = this.tasksToShow.filter((task) => {
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
      this.tasksToShow.map((task) => {
        if (task.id === taskId) task.taskTxt = taskTxt;
      });
    });
    this.selectedId = '';
    return [taskTitle, taskTxt];
  }

  showFiltered(users: string[]): ITask[] {
    let tasks: ITask[] = [];

    let filterType = users.includes('all') ? 'sub' : 'add';

    if (filterType === 'add') {
      users.forEach((usr) => {
        let userTasks = this.allTasks.filter((task) => {
          return task.from === usr;
        });
        tasks.push(...userTasks);
      });
    } else {
      let userTasks: ITask[] = [];
      this.allTasks.forEach((task) => {
        let taskStatus = users.reduce((acc: number, cur: string) => {
          if (cur === task.from) {
            acc += 1;
          }
          return acc;
        }, 0);
        if (taskStatus === 0) {
          userTasks.push(task);
        }
        tasks = userTasks;
      });
    }
    return tasks;
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((task) => {
      console.log('Dialog closed with task:', task);
      this.tasksToShow = this.tasksToShow.filter(
        (tsk: ITask) => task.id !== tsk.id
      );
    });
  };

  pagelen(pagelen: any): void {
    this.pageLength = pagelen.pageSize;

  };
  getPagedTasks(pageEvent: any): void {
    console.log(pageEvent);
    pageEvent.pageSize == this.pageLength ? this.pageIndex++ : this.pageIndex = 1;
    this.tasksService.getTasksbypage(this.pageIndex, pageEvent.pageSize).subscribe((retTasks) => {
      console.log(retTasks.data);
      this.tasksToShow = retTasks.data;
    });
  }
}
