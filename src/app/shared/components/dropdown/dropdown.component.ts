import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  showDropdown: boolean = false;
  filterArray: string[] = [];
  @Input() usersList!: string[]
  @Input() showAll = false
  @Input() id: number = 0
  @Input() type: string = "checkbox"
  userChoosen = new EventEmitter<string>();

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    if (this.showAll) {
      this.filterArray.push('all')
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  updateFilter(user: any) {
    if (!this.filterArray.includes(user)) {
      this.filterArray.push(user);
    } else {
      this.filterArray.splice(this.filterArray.indexOf(user), 1);
    }
    this.tasksService.updateFilteredUsers(this.filterArray);
    this.userChoosen.emit(user);
  }
}
