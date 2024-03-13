import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SHOWPASS:boolean= false
  isLoggedIn:boolean= false

  constructor() { 
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

  onPressValidatePass(pass: string, passCon: string): boolean {
    return pass !== passCon ? true : false
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

  logOut():void{
    localStorage.removeItem('LOGGEDIN')
    localStorage.removeItem('taskUser')
  }
}
