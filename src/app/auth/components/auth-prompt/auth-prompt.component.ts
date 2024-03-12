import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/services/users-service.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService
  ) {
    this.authForm = formB.group({
      user: ['', [Validators.required, Validators.minLength(4)]],
      pass: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      passCon: [''],
    });
  }

  ngOnInit(): void {
    console.log(this.page);
    this.SHOWCONF = this.page == 'signup' ? true : false;
    if (this.SHOWCONF) {
      this.authForm.controls['passCon'].setValidators(Validators.required);
    }
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
    if (pass !== passCon) {
      this.NOMATCH = true;
    } else {
      this.NOMATCH = false;
    }
    return false;
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      let authUser: string =
        this.authForm.controls['user'].value!.toLowerCase();
      let authPass: string = this.authForm.controls['pass'].value!;
      let authPassCon: string = this.authForm.controls['passCon'].value!;
      switch (this.page) {
        case 'signup':
          if (this.validatePass(authPass, authPassCon)) {
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
                if (this.validatePass(authPass, user.password)) {
                  localStorage.setItem('user', authUser);
                  this.userLoginToast(true);
                  setTimeout(() => {
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
    let type = event.target.parentElement.previousSibling.type;
    event.target.parentElement.previousSibling.type =
      type == 'text' ? 'password' : 'text';
    this.SHOWPASS = !this.SHOWPASS;
  }

  toggleType(showPass: boolean): string {
    return showPass == true ? 'text' : 'password';
  }

  userRegisterToast(success: boolean): void {
    success
      ? this.toastrService.success(
          'You will be redirected to the login page',
          'User added successfully',
          {
            timeOut: 700,
            progressBar: true,
            positionClass: 'toast-bottom-center',
          }
        )
      : this.toastrService.error(
          'Please select anothr username',
          'Username already taken',
          {
            timeOut: 1500,
            progressBar: true,
            positionClass: 'toast-bottom-center',
          }
        );
  }

  userLoginToast(status: boolean): void {
    status
      ? this.toastrService.success(
          'You will be redirected to the home page',
          'login successful',
          {
            timeOut: 700,
            positionClass: 'toast-bottom-center',
          }
        )
      : this.toastrService.error(
          'Please check your username',
          'Username does not exist',
          {
            timeOut: 1500,
            progressBar: true,
            positionClass: 'toast-bottom-center',
          }
        );
  }
}
