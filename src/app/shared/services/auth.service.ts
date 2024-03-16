import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { UsersService } from './users-service.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false
  private authSecretKey = 'kToken'

  SHOWPASS:boolean= false
  isLoggedIn:boolean= false
  NOMATCH: boolean= false

  constructor(private users: UsersService, 
              private router: Router,
              private toastService:ToastService,
    ) { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey)
  }

  validatePass(pass: string, passCon: string): boolean {
    let passMatch: boolean = false;
    if (pass !== passCon) {
      passMatch = false;
    } else {
      passMatch = true;
    }
    return passMatch;
  }

  onPressValidatePass(pass: string, passCon: string):boolean {
    this.NOMATCH = pass !== passCon ? true : false
    return this.NOMATCH
  }

  togglePass(event: any):boolean {
    let type = event.target.parentElement.previousSibling.type;
    event.target.parentElement.previousSibling.type =
      type == 'text' ? 'password' : 'text';
    return !this.SHOWPASS;
  }

  toggleType(showPass: boolean): string {
    return showPass == true ? 'text' : 'password';
  }

  signup(authUser:string ,authPass:string, authPassCon:string){
    let USERTAKEN = false
    if (this.validatePass(authPass, authPassCon)) {
      this.NOMATCH = false;
    } else {
      this.NOMATCH = true;
    }
    this.users.checkUser(authUser).subscribe((userId) => {
      if (Number(userId) != -1) {
        this.toastService.userRegisterToast(false);
        USERTAKEN = true;
      } else {
        USERTAKEN = false;
      }
      if (!this.NOMATCH && !USERTAKEN) {
        this.users.addUser(authUser, authPass);
        this.toastService.userRegisterToast(true);
        setTimeout(() => {
          this.router.navigate(['/landing', 'login']);
        }, 800);
      }
    });

  }

  login(authUser:string, authPass:string){
    let WRONG = false
    this.users.checkUser(authUser.toLowerCase()).subscribe((userID) => {
      if (Number(userID) > -1) {
        this.users.getUser(userID).subscribe((user) => {
          if (this.validatePass(authPass, user.password)) {
            localStorage.setItem('user', authUser);
            this.toastService.userLoginToast(true);
            this.isLoggedIn= true
            setTimeout(() => {
              const token:string = 'Kk*123123'
              localStorage.setItem(this.authSecretKey, token)
              localStorage.setItem('taskUser', JSON.stringify({authUser, userID}))
              this.isAuthenticated =true
                 this.router.navigate(['/home']);
            }, 800);
          } else {
            WRONG = true;
          }
        });
      } else {
        this.toastService.userLoginToast(false);
      }
    });
  }

  isAuthenticatedUSer():boolean {
    return this.isAuthenticated;
  }

  logOut():void{
    localStorage.removeItem(this.authSecretKey)
    this.isAuthenticated = false
  }
}
