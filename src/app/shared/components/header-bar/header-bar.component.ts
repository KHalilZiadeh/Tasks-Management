import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  @Input() page!: string;
  align!:string
  LOGGEDIN:boolean = false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.align = this.page == 'home' ? 'end' : 'spread'
  }

  logOut():void {
    this.authService.logOut()
    this.router.navigate(['/landing'])
  }
}
