import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Forgetpassword} from '../../shared/models/forgetpassword';
import {Orgforgetpassword} from '../../shared/models/orgforgetpassword';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { Roles } from 'src/app/shared/models/roles';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  ro = '';
  role: Roles = new Roles;
  forgetpassword: Forgetpassword = {email: ''};
  orgforgetpassword: Orgforgetpassword = {email_address: ''};
  constructor(private as: AuthService,
              public snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(value) {
    this.role.email = value.email;
    this.as.getRole(this.role).subscribe(res => {
      this.ro = res.message;
      console.log(this.ro);
      if (this.ro === 'Organizer') {
        this.orgforgetpassword.email_address = value.email;
        this.as.orgforgetpassword(this.orgforgetpassword).subscribe(res => {
          console.log(res.message);
          if (res.message === 'Send reset link and OTP to the organizer email address') {
            this.router.navigate(['/users/orgresetpassword'], {queryParams: {email: this.forgetpassword.email}});
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open('Reset password already sent to your email', undefined, config);
          } else {
            const config = new MatSnackBarConfig();
                config.verticalPosition = 'top';
                config.horizontalPosition = 'center';
                config.duration = 5000;
                this.snackBar.open(res.message, undefined, config);
          }
        });
      } else {
        this.forgetpassword.email = value.email;
        console.log(this.forgetpassword);
        this.as.forgetpassword(this.forgetpassword).subscribe(res => {
          if (res.message === 'Send reset link and OTP to the customer email address') {
            this.router.navigate(['/users/resetpassword'], {queryParams: {email: this.forgetpassword.email}});
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open('Reset password already sent to your email', undefined, config);
          } else {
            const config = new MatSnackBarConfig();
                config.verticalPosition = 'top';
                config.horizontalPosition = 'center';
                config.duration = 5000;
                this.snackBar.open(res.message, undefined, config);
          }
        });
      }
    });
  }
}
