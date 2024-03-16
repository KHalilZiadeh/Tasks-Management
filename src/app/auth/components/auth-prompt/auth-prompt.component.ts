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

  authForm: FormGroup;
  passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  WRONG:boolean= false
  NOMATCH:boolean= false
  SHOWPASS: boolean = false;
  SHOWCONF: boolean = false;
  SHOWHINTUSER: boolean = false;
  SHOWHINTPASS: boolean = false;
  SHOWHINTPASSCON: boolean = false;

  constructor(
    private formB: FormBuilder,
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

  validatePass(pass: string, passCon: string) {
    this.WRONG = this.authService.validatePass(pass, passCon)
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
          this.authService.signup(authUser, authPass, authPassCon)
          break;

        case 'login':
          this.authService.login(authUser, authPass)
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

}
