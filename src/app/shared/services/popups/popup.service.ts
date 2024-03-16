import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../popups/delete/delete.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup(event:any) {
    this.dialog.open(DeleteComponent);
  }
}