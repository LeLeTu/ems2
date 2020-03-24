import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {UserLog} from '../../shared/models/userlog';
import { Changeemail } from 'src/app/shared/models/changeemail';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: User = new User();
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor() { }

  ngOnInit(): void {
    let name = '';
  }

  editname() {
    console.log(this.user.name);
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {  
      } else {
            const config = new MatSnackBarConfig();
      }
    });
  }

  editpassword() {
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {
      } else {
            const config = new MatSnackBarConfig();  
      }
    });
  }
  
  editphone() {
    this.authService.updateUser(user).subscribe(res => {
      if (res.message === 'Customer updated') {
      } else {
            const config = new MatSnackBarConfig()
      }
    });
  }
}
