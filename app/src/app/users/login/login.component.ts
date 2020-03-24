import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Userlogin } from 'src/app/shared/models/userlogin';
import { Organizerlogin} from '../../shared/models/organizerlogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userlogin: Userlogin = {email : '', psw: ''};
  organizerlogin: Organizerlogin = {email_address: '', password: ''};
  constructor(
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
    this.email =username;
    this.as.getRole(this.role).subscribe (res=>{
      this.ro = res.message;  
          }
        });
      } else if (this.ro === 'Customer') {
        this.email = username;
        this.psw = password;
  
      }  
}
