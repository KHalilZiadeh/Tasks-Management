import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { TasksService } from '../../../shared/services/tasks.service';
// import { ITaskToEdit } from '../interfaces/itask-to-edit';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  
  @Input() user!: string
  @Input() filterByUser!: string
  column: string = 'both'
  
  allTasks: ITask[] = []
  filteredTasks!: ITask[]
  selectedId!: string
  
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getAllTasks().subscribe(reTasks => {
      this.allTasks = reTasks
      this.filteredTasks = this.allTasks
    })
  }

  ngOnChanges(changes: any): void {
    let toFilter: string = changes['filterByUser'].currentValue
    if (toFilter !== undefined) this.filteredTasks = this.filterTasks(toFilter, this.allTasks, 'both')
  }

  filterTasks(user: string, tasks: ITask[], column: string): ITask[] {
    let filtered: ITask[] = tasks.filter(task => {
      switch (column) {
        case 'from':
          return user === task.from
        case 'to':
          return user === task.to
        case 'both':
          return user === task.from || user === task.to
        default:
          return false
      }
    })
    return filtered
  }

  selectFrom(): void {
    this.column = 'from'
    this.filteredTasks = this.filterTasks(this.user, this.allTasks, this.column)
  }

  selectTo(): void {
    this.column = 'to'
    this.filteredTasks = this.filterTasks(this.user, this.allTasks, this.column)
  }

  selectBoth(): void {
    this.column = 'both'
    this.filteredTasks = this.filterTasks(this.user, this.allTasks, this.column)
  }

  viewAll(): void {
    this.filteredTasks = this.allTasks
  }

  markAsDone(event: any): void {
    let taskId: string = event.target.parentElement.id
    this.tasksService.getTaskById(taskId).subscribe(task => {
      task.status = 'done'
      this.tasksService.ediTask(task)
      this.allTasks.map(task => {
        if (task.taskId === taskId) task.status = 'done'
      })
      this.filteredTasks.map(task => {
        if (task.taskId === taskId) task.status = 'done'
      })
    })
  }

  deleteTask(event: any) {
    let taskId: string = event.target.parentElement.id
    this.tasksService.deleteTask(taskId)
    this.allTasks = this.allTasks.filter(task => {
      return task.taskId !== taskId
    })
    this.filteredTasks = this.filteredTasks.filter(task => {
      return task.taskId !== taskId
    })
  }

  showEdit(event: any): void {
    this.selectedId = event.target.parentElement.id
  }

  editTask(taskObj: any): void {
    const { taskTxt, taskId } = taskObj
    this.tasksService.getTaskById(taskId).subscribe(task => {
      task.taskTxt = taskTxt
      this.tasksService.ediTask(task)
      this.allTasks.map(task => {
        if (task.taskId === taskId) task.taskTxt = taskTxt
      })
      this.filteredTasks.map(task => {
        if (task.taskId === taskId) task.taskTxt = taskTxt
      })
    })
    this.selectedId = ''
  }
}

