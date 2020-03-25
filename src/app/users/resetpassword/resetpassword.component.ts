import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Resetpassword} from '../../shared/models/resetpassword';
import {Observable, timer} from 'rxjs';
import {Forgetpassword} from '../../shared/models/forgetpassword';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from '../register/password-strength.validators';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit{
  resetpassword: Resetpassword = {customerToken: '', newPassword: ''};
  currTime: number;
  disable = 'disabled';
  show: boolean;
  obsTimer: Observable<number> = timer(1000, 1000);
  params = {email: ''};
  cToken='';
  resetpasswordFormGroup: FormGroup;
  forgetpassword: Forgetpassword = {email: ''};
  constructor(private as: AuthService,
              private arouter: ActivatedRoute,
              public snackBar: MatSnackBar,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.arouter.queryParams.subscribe(params => {
      this.forgetpassword.email = params.email;
      this.cToken= params.cToken;
      console.log(this.cToken);
    });
    this.obsTimer.subscribe(currTime => this.currTime = 900 - currTime);
    this.resetpasswordFormGroup = this.fb.group({
      token: new FormControl(this.cToken, Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordStrengthValidator
      ])),
      confirm_password: ['', Validators.required]}, {validator: this.checkIfMatchingPasswords('password', 'confirm_password')})
  };
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  resend() {
    this.as.forgetpassword(this.forgetpassword).subscribe(res => {
      if (res.message === 'Send reset link and OTP to the customer email address') {
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
  getError(el) {
    switch (el) {
      case 'name':
        if (this.resetpasswordFormGroup.get('token').hasError('required')) {
          return 'token required';
        }
        break;
      case 'confirm_password':
        if (this.resetpasswordFormGroup.get('confirm_password').hasError('required')) {
          return 'confirm password required';
        } else if (this.resetpasswordFormGroup.get('confirm_password').hasError('notEquivalent')) {
          return 'password and confirm password not match';
        };
        break;
      default:
        return '';
    }
  }
  myFunction() {
    this.show = !this.show;
  }
  onSubmit() {
    if (this.resetpasswordFormGroup.valid) {
      const {token, password} = this.resetpasswordFormGroup.value;
      this.resetpassword.customerToken = token;
      this.resetpassword.newPassword = password;
      this.as.resetpassword(this.resetpassword).subscribe(res => {
        if (res.message === 'Password reset successfully!') {
          this.router.navigate(['/users/login']);
          const config = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          config.horizontalPosition = 'center';
          config.duration = 5000;
          this.snackBar.open('Password reset successfully!', undefined, config);
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
