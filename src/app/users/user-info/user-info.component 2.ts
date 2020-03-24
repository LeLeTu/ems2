import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let name = '';
    this.authService.getAllCustomer().subscribe(res => {
      for (let i = 0; i < res.length ; i++) {
        if (res[i].email ===  name) {
          this.user = res[i];
        }
      }
    })
    
  }
  editname() {
    console.log(this.user.name);
    const user: User = new User();
    user.name = this.user.name;
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {
        let userlog: UserLog = new UserLog();
        userlog.user = this.user.name;
        this.authService.userlogSubject.next(userlog);
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('User Name Updated Success', undefined, config);
      } else {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open(res.message, undefined, config);
      }
    });
  }
  editpassword() {
    const user: User = new User();
    user.psw = this.user.psw;
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('User Password Updated Success', undefined, config);
      } else {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open(res.message, undefined, config);
      }
    });
  }

}
