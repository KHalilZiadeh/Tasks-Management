import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TasksService } from '../../shared/services/tasks.service';
import { UsersService } from '../../shared/services/users-service.service';
import { IUsers } from '../../shared/interfaces/iusers';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  from!: string;
  me!: string;
  taskForm: FormGroup;
  withOutMe!: IUsers[];
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
    this.from = localStorage.getItem('user')!;
    this.me = localStorage.getItem('user')!;
    this.users.getAllUsers().subscribe((usrs) => {
      this.withOutMe = usrs.filter((usr) => {
        return usr.username !== this.me;
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

  // TODO
  // Make reusable component for the task in the tasks table
}

