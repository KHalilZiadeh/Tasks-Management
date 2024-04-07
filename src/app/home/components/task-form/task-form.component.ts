import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TasksService } from '../../../shared/services/tasks.service';
import { UsersService } from '../../../shared/services/users-service.service';
import { FormGroupDirective } from '@angular/forms';

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
  math = Math
  testValu: number = 1
  checkboxes: checkbox[] = []
  allCompleted: boolean = false
  baseInitVal: any = {
    title: '',
    taskTxt: '',
    assignee: '',
    deadline: '',
    priority: 1
  }

  @ViewChild(FormGroupDirective) private form!: FormGroupDirective
  formInitVAl: any = {}

  constructor(
    private tasks: TasksService,
    private formB: FormBuilder,
    private users: UsersService
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
        return user.username !== this.me
      }).map((user: any) => {
        return user.username
      });
    });
    let time = new Date();
    let year = time.getFullYear().toString();
    let month = (time.getMonth() + 1).toString();
    let day = time.getDate().toString();
    month = month.length == 1 ? '0' + month : month;
    day = day.length == 1 ? '0' + day : day;

    this.TODAY = year + '-' + month + '-' + day;
    this.baseInitVal.deadline = this.TODAY
    this.taskForm.controls['deadline'].setValue(this.TODAY);
    this.checkboxes = Object.keys(this.taskForm.controls).map(control => {
      return { name: control, checked: false }
    })

  }

  onSubmit() {
    let title = this.taskForm.controls['title'].value!;
    let taskTxt = this.taskForm.controls['taskTxt'].value!;
    let assignee = this.taskForm.controls['assignee'].value!;
    let deadline = this.taskForm.controls['deadline'].value!;
    let priority = this.taskForm.controls['priority'].value!;
    this.tasks.addTask(title, taskTxt, this.me, assignee, deadline, priority);

    this.setInitalValues()
    this.form.resetForm(this.formInitVAl)
  }



  updateAssignee(event: any) {
    this.taskForm.controls['assignee'].setValue(event);
  }

  updateNumberOfFields() {
    let numberOfFields: number = 0
    let controls = this.taskForm.controls
    for (const control in controls) {
      if (controls[control].value !== '') numberOfFields++
    }
    return numberOfFields
  }

  someCompleted(): boolean {
    return this.checkboxes.filter(checkbox => checkbox.checked).length > 0 && !this.allCompleted
  }

  updateAllComplete() {
    this.allCompleted = this.checkboxes !== null && this.checkboxes.every(checkbox => checkbox.checked)
  }

  setAll(completed: boolean) {
    this.allCompleted = completed
    this.checkboxes.forEach(checkbox => checkbox.checked = completed)
  }

  setInitalValues(): void {
    for (let key of this.checkboxes) {
      if (key.checked) { this.formInitVAl[key.name] = this.taskForm.controls[key.name].value }
      else {
        console.log(this.baseInitVal[key.name])
        { this.formInitVAl[key.name] = this.baseInitVal[key.name] }
      }
    }
  }

  reFillForm() {
    if (this.allCompleted) {
      this.formInitVAl = this.form.value
    } else if (this.someCompleted()) {
      this.setInitalValues()
    } else {
      this.formInitVAl = this.baseInitVal
    }
  }
}
