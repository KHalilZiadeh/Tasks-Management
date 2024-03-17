import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service.service';
import { IUsers } from '../../interfaces/iusers';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  allUsers!: IUsers[];
  showDropdown: boolean = false;
  filterArray: string[] = ['all'];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  updateFilter(event: any) {
    console.log(event.currentTarget.id);
    this.filterArray.push(event.currentTarget.id);
    console.log(this.filterArray);
  }
}
