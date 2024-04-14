import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TasksService } from '../../../shared/services/tasks.service';
import { UsersService } from '../../../shared/services/users-service.service';
import { FormGroupDirective } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ITask } from 'src/app/shared/interfaces/itask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskCardComponent } from 'src/app/shared/components/task-card/task-card.component';

interface checkbox {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  from!: string;
  me!: string;
  taskForm: FormGroup;
  withOutMe!: string[];
  TODAY!: string;
  taskTitle!: string;
  math = Math;
  testValu: number = 1;
  checkboxes: checkbox[] = [];
  allCompleted: boolean = false;
  baseInitVal: any = {
    title: '',
    taskTxt: '',
    assignee: '',
    deadline: '',
    priority: 1
  };
  randomTasks: ITask[] = [];

  @ViewChild(FormGroupDirective) private form!: FormGroupDirective;
  formInitVAl: any = {};
  numberOfSelects: number = 0;
  tasksNumber!: number;
  pageLength: number = 10;

  constructor(
    private tasks: TasksService,
    private formB: FormBuilder,
    private users: UsersService,
    private toast: ToastService,
    private _snackBar: MatSnackBar
  ) {
    this.taskForm = formB.group({
      title: [''],
      taskTxt: ['', Validators.required],
      assignee: ['', Validators.required],
      deadline: [this.TODAY],
      priority: [1]
    });
  }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem('taskUser')!).authUser;
    this.users.getAllUsers().subscribe((usrs: any) => {
      this.withOutMe = usrs.filter((user: any) => {
        return user.username !== this.me;
      }).map((user: any) => {
        return user.username;
      });
    });
    let time = new Date();
    let year = time.getFullYear().toString();
    let month = (time.getMonth() + 1).toString();
    let day = time.getDate().toString();
    month = month.length == 1 ? '0' + month : month;
    day = day.length == 1 ? '0' + day : day;

    this.TODAY = year + '-' + month + '-' + day;
    this.baseInitVal.deadline = this.TODAY;
    this.taskForm.controls['deadline'].setValue(this.TODAY);
    this.checkboxes = Object.keys(this.taskForm.controls).map(control => {
      return { name: control, checked: false };
    });
    this.getRandomTasks(18);
    this.getTasksCount();
  }

  getMonth(mon: string): string {
    switch (mon) {
      case 'Jan':
        mon = '01';
        break;
      case 'Feb':
        mon = '02';
        break;
      case 'Mar':
        mon = '03';
        break;
      case 'Apr':
        mon = '04';
        break;
      case 'May':
        mon = '05';
        break;
      case 'Jun':
        mon = '06';
        break;
      case 'Jul':
        mon = '07';
        break;
      case 'Aug':
        mon = '08';
        break;
      case 'Sep':
        mon = '09';
        break;
      case 'Oct':
        mon = '10';
        break;
      case 'Nov':
        mon = '11';
        break;
      case 'Dec':
        mon = '12';
        break;
    }
    return mon;
  }

  onSubmit() {
    let title: string = this.taskForm.controls['title'].value!;
    let taskTxt: string = this.taskForm.controls['taskTxt'].value!;
    let assignee: string = this.taskForm.controls['assignee'].value!;
    let deadline: string = this.taskForm.controls['deadline'].value!;
    deadline = this.extractDate(deadline.toString());

    let priority: number = this.taskForm.controls['priority'].value!;
    this.tasks.addTask(title, taskTxt, this.me, assignee, deadline, priority);
    let eleRef = this._snackBar.openFromComponent(TaskCardComponent, {
      duration: 2000,
      data: {
        title: title,
        taskTxt: taskTxt,
        from: this.me,
        to: assignee,
        deadline: deadline,
        priority: priority
      }
    });
    eleRef.afterDismissed().subscribe(tesk => {
      this.getRandomTasks(15);
    });
    this.setInitalValues();
    this.form.resetForm(this.formInitVAl);
  }

  openSnackBar(msg: string, action: string) {
    this._snackBar.open(msg, action);
  }

  updateAssignee(event: any) {
    this.taskForm.controls['assignee'].setValue(event);
  }

  updateNumberOfFields() {
    let numberOfFields: number = 0;
    let controls = this.taskForm.controls;
    for (const control in controls) {
      if (controls[control].value !== '') numberOfFields++;
    }
    return numberOfFields;
  }

  someCompleted(): boolean {
    return this.checkboxes.filter(checkbox => checkbox.checked).length > 0 && !this.allCompleted;
  }

  updateAllComplete() {
    this.allCompleted = this.checkboxes !== null && this.checkboxes.every(checkbox => checkbox.checked);
  }

  setAll(completed: boolean) {
    this.allCompleted = completed;
    this.checkboxes.forEach(checkbox => checkbox.checked = completed);
    this.updateNumberOfSelects();
  }

  setInitalValues(): void {
    for (let key of this.checkboxes) {
      if (key.checked) { this.formInitVAl[key.name] = this.taskForm.controls[key.name].value; }
      else {
        { this.formInitVAl[key.name] = this.baseInitVal[key.name]; }
      }
    }
  }

  reFillForm() {
    if (this.allCompleted) {
      this.formInitVAl = this.form.value;
    } else if (this.someCompleted()) {
      this.setInitalValues();
    } else {
      this.formInitVAl = this.baseInitVal;
    }
  }

  updateNumberOfSelects() {
    this.numberOfSelects = this.checkboxes.reduce(function (acc, checkbox) { return checkbox.checked ? acc + 1 : acc; }, 0);
  }

  toastAToast(msgTitle: string, msg: string, number?: number): void {
    this.toast.toastAToast(number + ' ' + msg, msgTitle);
  }

  getRandomTasks(numberOftasks: number): void {
    this.randomTasks = [];
    for (let i = 0; i < numberOftasks; i++) {
      let randomNumber = Math.floor(Math.random() * 50).toString();
      this.tasks.getTaskById(randomNumber).subscribe(task => {
        this.randomTasks.push(task);
      });
    }
  }

  extractDate(deadline: string): string {
    let date!: string;
    date = deadline.split(" ")[3] + '-' + this.getMonth(deadline.split(" ")[1]) + '-' + deadline.split(" ")[2];
    return date;
  }

  getTasksCount() {
    this.tasks.getAllTasks().subscribe(tasks => {
      this.tasksNumber = tasks.length;
    });
  }
}
