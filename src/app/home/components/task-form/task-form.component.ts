import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TasksService } from '../../../shared/services/tasks.service';
import { UsersService } from '../../../shared/services/users-service.service';


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

  constructor(
    private tasks: TasksService,
    private formB: FormBuilder,
    private users: UsersService
  ) {
    this.taskForm = formB.group({
      title: [''],
      taskTxt: ['', Validators.required],
      assignee: ['', Validators.required],
      deadline: [''],
    });
  }

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem('taskUser')!).authUser;
    this.users.getAllUsers().subscribe((usrs: any) => {
      this.withOutMe = usrs.map((user: any) => {
        if (user.username !== this.me) {
          return user.username
        }
      });
    });
    let time = new Date();
    let year = time.getFullYear().toString();
    let month = (time.getMonth() + 1).toString();
    let day = time.getDate().toString();
    month = month.length == 1 ? '0' + month : month;
    day = day.length == 1 ? '0' + day : day;

    this.TODAY = year + '-' + month + '-' + day;
    this.taskForm.controls['deadline'].setValue(this.TODAY);
  }

  onSubmit() {
    let title = this.taskForm.controls['title'].value!;
    let taskTxt = this.taskForm.controls['taskTxt'].value!;
    let assignee = this.taskForm.controls['assignee'].value!;
    let deadline = this.taskForm.controls['deadline'].value!;

    this.tasks.addTask(title, taskTxt, this.me, assignee, deadline);
    title = this.taskForm.controls['title'].setValue('');
    taskTxt = this.taskForm.controls['taskTxt'].setValue('');
    assignee = this.taskForm.controls['assignee'].setValue('');
  }

  checkValue() {
    console.log(this.taskForm.controls['assignee']);
  }

  updateAssignee(event: any) {
    this.taskForm.controls['assignee'].setValue(event);
  }
}
