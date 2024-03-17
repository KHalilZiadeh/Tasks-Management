import { Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../popups/delete/delete.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  DELETE: boolean = false;

  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(DeleteComponent);
  }

  deleteConf() {
    this.DELETE = true;
  }
}
