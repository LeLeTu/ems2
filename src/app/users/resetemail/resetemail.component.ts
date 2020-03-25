import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Resetpassword} from '../../shared/models/resetpassword';
import {Observable, timer} from 'rxjs';
import {Forgetpassword} from '../../shared/models/forgetpassword';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from '../register/password-strength.validators';
import { Resetemail } from 'src/app/shared/models/resetemail';
import { Changeemail } from 'src/app/shared/models/changeemail';

@Component({
  selector: 'app-resetemail',
  templateUrl: './resetemail.component.html',
  styleUrls: ['./resetemail.component.scss']
})
export class ResetemailComponent implements OnInit {
  resetemail: Resetemail = {customerToken: '', newEmail: ''};
  currTime: number;
  disable = 'disabled';
  show: boolean;
  obsTimer: Observable<number> = timer(1000, 1000);
  params = {email: ''};
  cToken='';
  resetemailFormGroup: FormGroup;
  changeEmail: Changeemail = {email: ''};
  constructor(private as: AuthService,
              private arouter: ActivatedRoute,
              public snackBar: MatSnackBar,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.arouter.queryParams.subscribe(params => {
      this.changeEmail.email = params.email;
      this.cToken= params.cToken;
    });
    this.obsTimer.subscribe(currTime => this.currTime = 900 - currTime);
    this.resetemailFormGroup = this.fb.group({
      token: new FormControl(this.cToken, Validators.compose([
        Validators.required,
      ])),
      newemail: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      })
  };

  resend() {
    this.as.changeEmail(this.changeEmail).subscribe(res => {
      if (res.message === 'Send reset link and OTP to the customer email address') {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('change email already sent to your email', undefined, config);
      } else {
        const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open(res.message, undefined, config);
      }
    });
  }
  getError(el) {
    switch (el) {
      case 'token':
        if (this.resetemailFormGroup.get('token').hasError('required')) {
          return 'token required';
        }
        break;
      default:
        return '';
    }
  }
  onSubmit() {
    if (this.resetemailFormGroup.valid) {
      const {token, newemail} = this.resetemailFormGroup.value;
      this.resetemail.customerToken = token;
      this.resetemail.newEmail = newemail;
      // console.log(this.resetemail);
      this.as.resetEmail(this.resetemail).subscribe(res => {
        console.log(res);
        if (res.message === 'Email reset successfully!') {
          this.router.navigate(['/users/login']);
          const config = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          config.horizontalPosition = 'center';
          config.duration = 5000;
          this.snackBar.open('Email reset successfully!', undefined, config);
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
}
