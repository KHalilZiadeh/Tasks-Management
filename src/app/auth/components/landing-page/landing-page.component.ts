import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../../../../styles.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    if('taskUser' in localStorage){
      let localUser = JSON.parse(localStorage.getItem('taskUser')!)
      this.usersService.getUser(localUser.userID).subscribe(user => {
        if(user.username === localUser.authUser){
          let LOGGEDIN:boolean = true
          localStorage.setItem('LOGGEDIN', JSON.stringify(LOGGEDIN) )
          this.router.navigate(['/home'])
        }
      })
    }
  }
}
