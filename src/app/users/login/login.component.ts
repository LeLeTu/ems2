import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import { Userlogin } from 'src/app/shared/models/userlogin';
import {Organizerlogin} from '../../shared/models/organizerlogin';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { UserLog } from 'src/app/shared/models/userlog';
import { Roles } from 'src/app/shared/models/roles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  role:Roles = new Roles;
  show: boolean;
  err = false;
  ro = '';
  userlogin: Userlogin = {email : '', psw: ''};
  organizerlogin: Organizerlogin = {email_address: '', password: ''};
  constructor(
    private as: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.show = false;
  }

  ngOnInit() {
  }
  myFunction() {
    this.show = !this.show;
  }
  onSubmit(value) {
    this.role.email = value.username;
    this.as.getRole(this.role).subscribe (res => {
      this.ro = res.message;
      if (this.ro === 'Organizer') {
        this.organizerlogin.email_address = value.username;
        this.organizerlogin.password = value.password;
        this.as.organizerlogin(this.organizerlogin).subscribe(res => {
          console.log(res);
          if (res.message === 'Organizer login success') {
            let userlog: UserLog = new UserLog();
            userlog.user = value.username;
            // @ts-ignore
            userlog.id = res.OrganizerID;
            console.log(userlog);
            this.as.userlogSubject.next(userlog);
            this.as.organizerSubject.next(userlog);
            this.router.navigate(['products']);
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open('Organizer login Success', undefined, config);
          } else {
            const config = new MatSnackBarConfig();
              config.verticalPosition = 'top';
              config.horizontalPosition = 'center';
              config.duration = 5000;
              this.snackBar.open(res.message, undefined, config);
            this.err = true;
          }
        });
      } else if (this.ro === 'Customer') {
        this.userlogin.email = value.username;
        this.userlogin.psw = value.password;
        this.as.userlogin(this.userlogin).subscribe(res => {
          // console.log(res);
          if (res.message === 'Customer login success') {
            let userlog: UserLog = new UserLog();
            userlog.user = value.username;
            userlog.id = res.CustomerID;
            this.as.userlogSubject.next(userlog);
            this.router.navigate(['products']);
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open('Customer login Success', undefined, config);
          } else {
            const config = new MatSnackBarConfig();
              config.verticalPosition = 'top';
              config.horizontalPosition = 'center';
              config.duration = 5000;
              this.snackBar.open(res.message, undefined, config);
            this.err = true;
          }
        });
      } else {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('The email or password is incorrect', undefined, config);
        // alert('The email or password is incorrect');
      }
    });
  }

  onRegister() {
    this.router.navigate(['/users/register']);
  }
  onForgetPassword() {
    this.router.navigate(['/users/forgetpassword']);
  }
  updateErr() {
    if (this.err) {
      this.err = false;
    }
  }

}
