import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users-service.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  @Input() page!: string;
  align!:string
  LOGGEDIN:boolean = false
  usersList!: string[]

  constructor(private authService: AuthService,
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.align = this.page == 'home' ? 'end' : 'spread'
    this.usersService.getAllUsers().subscribe(users => {
      this.usersList = users.map(user => {
        return user.username
      })
    })
  }

  logOut():void {
    this.authService.logOut()
    this.router.navigate(['/landing'])
  }
}
