import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ITask } from '../../interfaces/itask';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {}

  cancle() {
    this.dialogRef.close(true);
  }

  confirm() {
    this.tasksService.deleteTask(this.data.id).subscribe((task: ITask) => {
      this.dialogRef.close(task);
    });
  }
}
