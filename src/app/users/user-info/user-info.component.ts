import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {AuthService} from '../../shared/services/auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {UserLog} from '../../shared/models/userlog';
import { Changeemail } from 'src/app/shared/models/changeemail';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: User = new User();
  showname =true;
  showall=true;
  showemail =true;
  showphone =true;
  showpassword =true;
  id=0;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private authService: AuthService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let id = 0;
    this.authService.userlogSubject.subscribe(res => {
      if (res != null) {
       id = res.id;
       this.id = res.id;
      }
    });
    this.authService.getAllCustomer().subscribe(res => {
      for (let i = 0; i < res.length ; i++) {
        if (res[i].id ===  id) {
          this.user = res[i];
        }
      }
    });
  }

  editname() {
    console.log(this.user.name);
    const user: User = new User();
    user.id = this.id;
    user.name = this.user.name;
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {
        let userlog: UserLog = new UserLog();
        userlog.user = this.user.name;
        userlog.id = this.id;
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
  editall() {
    const user: User = new User();
    user.name = this.user.name;
    user.phone = this.user.phone;
    user.id = this.id
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {
        let userlog: UserLog = new UserLog();
        userlog.user = this.user.name;
        userlog.id = this.id;
        this.authService.userlogSubject.next(userlog);
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('User Name and Phone Number Updated Success', undefined, config);
      } else {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open(res.message, undefined, config);
      }
    });
  }
  // editpassword() {
  //   const user: User = new User();
  //   user.psw = this.user.psw;
  //   this.authService.updateUser(user).subscribe(res => {
  //     if (res.message === 'Customer updated') {
  //       const config = new MatSnackBarConfig();
  //       config.verticalPosition = 'top';
  //       config.horizontalPosition = 'center';
  //       config.duration = 5000;
  //       this.snackBar.open('User Password Updated Success', undefined, config);
  //     } else {
  //           const config = new MatSnackBarConfig();
  //           config.verticalPosition = 'top';
  //           config.horizontalPosition = 'center';
  //           config.duration = 5000;
  //           this.snackBar.open(res.message, undefined, config);
  //     }
  //   });
  // }
  editphone() {
    const user: User = new User();
    user.phone = this.user.phone;
    user.id = this.id;
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('User Phone Updated Success', undefined, config);
      } else {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open(res.message, undefined, config);
      }
    });
  }
  editemail() {
    const user: User = new User();
    user.email = this.user.email;
    let changeEmail = new Changeemail;
    changeEmail.email = this.user.email;
    this.authService.changeEmail(changeEmail).subscribe(res => {
      if (res.message === 'Send reset link and OTP to the customer email address') {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('Send reset link and OTP to the customer email address', undefined, config);
      } else {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open(res.message, undefined, config);
      }
    });
    // this.authService.updateUser(user).subscribe(res => {
    //   if (res.message === 'Customer updated') {
    //     const config = new MatSnackBarConfig();
    //     config.verticalPosition = 'top';
    //     config.horizontalPosition = 'center';
    //     config.duration = 5000;
    //     this.snackBar.open('User Email Updated Success', undefined, config);
    //   } else {
    //         const config = new MatSnackBarConfig();
    //         config.verticalPosition = 'top';
    //         config.horizontalPosition = 'center';
    //         config.duration = 5000;
    //         this.snackBar.open(res.message, undefined, config);
    //   }
    // });
  }
  Cancelname() {
    this.showname = true;
  }
  Cancelphone() {
    this.showphone = true;
  }
  Cancelemail() {
    this.showemail = true;
  }
  Cancelall() {
    this.showall = true;
  }
}
