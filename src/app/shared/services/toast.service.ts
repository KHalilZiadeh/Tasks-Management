import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService) { }

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
