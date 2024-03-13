import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/services/users-service.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-auth-prompet',
  templateUrl: './auth-prompt.component.html',
  styleUrls: ['./auth-prompt.component.scss'],
})
export class AuthPrompetComponent implements OnInit {
  @Input() page: string = '';

  WRONG: boolean = false;
  USERTAKEN: boolean = false;
  USEREXIST: boolean = false;
  NOMATCH: boolean = false;
  authForm: FormGroup;
  passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  SHOWPASS: boolean = false;
  SHOWCONF: boolean = false;
  SHOWHINTUSER: boolean = false;
  SHOWHINTPASS: boolean = false;
  SHOWHINTPASSCON: boolean = false;

  constructor(
    private router: Router,
    private formB: FormBuilder,
    private users: UsersService,
    private toastService:ToastService,
    private authService: AuthService
  ) {
    this.authForm = formB.group({
      user: ['', [Validators.required, Validators.minLength(4)]],
      pass: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      passCon: [''],
    });
  }

  ngOnInit(): void {
    this.SHOWCONF = this.page == 'signup' ? true : false;
    if (this.SHOWCONF) {
      this.authForm.controls['passCon'].setValidators(Validators.required);
    }
  }

  validatePass(pass: string, passCon: string): boolean {
    return this.authService.validatePass(pass, passCon)
  }

  onPressValidatePass(pass: string, passCon: string) {
    this.NOMATCH = this.authService.onPressValidatePass(pass, passCon)
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      let authUser: string =
        this.authForm.controls['user'].value!.toLowerCase();
      let authPass: string = this.authForm.controls['pass'].value!;
      let authPassCon: string = this.authForm.controls['passCon'].value!;
      switch (this.page) {
        case 'signup':
          if (this.authService.validatePass(authPass, authPassCon)) {
            this.NOMATCH = false;
          } else {
            this.NOMATCH = true;
          }
          this.users.checkUser(authUser).subscribe((userId) => {
            if (Number(userId) != -1) {
              this.userRegisterToast(false);
              this.USERTAKEN = true;
            } else {
              this.USERTAKEN = false;
            }
            if (!this.NOMATCH && !this.USERTAKEN) {
              this.users.addUser(authUser, authPass);
              this.userRegisterToast(true);
              setTimeout(() => {
                this.router.navigate(['/landing', 'login']);
              }, 800);
            }
          });
          break;

        case 'login':
          this.users.checkUser(authUser.toLowerCase()).subscribe((userID) => {
            if (Number(userID) > -1) {
              this.USEREXIST = false;
              this.users.getUser(userID).subscribe((user) => {
                if (this.authService.validatePass(authPass, user.password)) {
                  localStorage.setItem('user', authUser);
                  this.userLoginToast(true);
                  this.authService.isLoggedIn= true
                  setTimeout(() => {
                    localStorage.setItem('taskUser', JSON.stringify({authUser, userID}))
                       this.router.navigate(['/home']);
                  }, 800);
                } else {
                  this.WRONG = true;
                }
              });
            } else {
              this.userLoginToast(false);
              this.USEREXIST = true;
            }
          });
          break;
      }
    }
  }

  togglePass(event: any) {
    this.SHOWPASS = this.authService.togglePass(event)
  }

  toggleType(showPass: boolean): string {
    return this.authService.toggleType(showPass)
  }

  userRegisterToast(success: boolean): void {
    this.toastService.userRegisterToast(success)
  }

  userLoginToast(status: boolean): void {
    this.toastService.userLoginToast(status)
  }
}
