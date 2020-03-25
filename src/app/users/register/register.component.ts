import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user';
import {Organizer} from '../../shared/models/organizer';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { PasswordStrengthValidator } from './password-strength.validators';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { PolicyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';
import { Roles } from 'src/app/shared/models/roles';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  terms = [false, false];
  isDisabled = true;
  show: boolean;
  checked = false;
  [x: string]: any;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  err = false;
  registerFormGroup: FormGroup;
  user: User = {name: '', email: '', psw: '', phone: ''};
  // @ts-ignore
  organizer: Organizer = {organizer_name: '', email_address: '', other_details: '', password: ''};
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) { }

  openBottomSheet(): void {
    this.terms[0] = true;
    if (this.terms[0]&&this.terms[1]) {
      this.isDisabled = false;
    }
    this. _bottomSheet.open(PolicyComponent);
  }
  openBottomSheet2(): void {
    this.terms[1] = true;
    if (this.terms[0]&&this.terms[1]) {
      this.isDisabled = false;
    }
    this. _bottomSheet.open(TermsComponent);
  }
  checkbox() {
    this.checked = true;
    console.log(this.checked);
  }
  myFunction() {
    this.show = !this.show;
  }
  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      role: 'user',
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
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
        }
        else {
            return passwordConfirmationInput.setErrors(null);
        }
      }
    }
  getError(el) {
    switch(el) {
      case 'name':
        if (this.registerFormGroup.get('name').hasError('required')) {
          return 'user required';
        }
        if (this.registerFormGroup.get('name').hasError('minlength')) {
          return 'user name at least 6 characters';
        }
        break;
      case 'email':
        if (this.registerFormGroup.get('email').hasError('required')) {
          return 'email required';
        } else if (this.registerFormGroup.get('email').hasError('pattern')) {
          return 'email format shoud be like XX@XXXX.XXX';
        }
        break;
      case 'phone':
        if (this.registerFormGroup.get('phone').hasError('required')) {
          return 'phone required';
        }
        else if (this.registerFormGroup.get('phone').hasError('minlength')) {
          return 'phone number must be 10 digital';
        }
        break;
      case 'confirm_password':
        if (this.registerFormGroup.get('confirm_password').hasError('required')) {
          return 'confirm password required';
        } else if (this.registerFormGroup.get('confirm_password').hasError('notEquivalent')) {
          return 'password and confirm password not match';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit() {
    if (this.registerFormGroup.valid && this.checked) {
      const {role, name, email, phone, password} = this.registerFormGroup.value;
      let r: Roles = new Roles;
      r.email = email;
      let ro = '';
      this.authService.getRole(r).subscribe(res => {
        ro = res.message;
      });
      if ((ro !== 'Customer') && (ro !== 'Organizer')) {
        if (role === 'user') {
          this.user.name = name;
          this.user.email = email;
          this.user.phone = phone;
          this.user.psw = password;
          this.authService.register(this.user)
            .subscribe(res => {
              if (res.message === 'Customer registered and Greeting send to the eamil') {
                this.router.navigate(['/users/login']);
                const config = new MatSnackBarConfig();
                config.verticalPosition = 'top';
                config.horizontalPosition = 'center';
                config.duration = 5000;
                this.snackBar.open('Customer Registered Success', undefined, config);
                console.log('success');
                const dialogRef = this.dialog.open(DialogsOverviewExampleDialog, {
                  width: '700px'
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                });
              } else {
                // show error text;
                const config = new MatSnackBarConfig();
                config.verticalPosition = 'top';
                config.horizontalPosition = 'center';
                config.duration = 5000;
                this.snackBar.open(res.message, undefined, config);
              }
            }, (err) => {
              this.err = true;
            });
        } else if (role === 'organizer') {
          this.organizer.organizer_name = name;
          this.organizer.email_address = email;
          this.organizer.other_details = phone;
          this.organizer.password = password;
          this.authService.organizerregister(this.organizer).subscribe(res => {
            if (res.message === 'Organizer registered') {
              this.router.navigate(['/users/login']);
              const config = new MatSnackBarConfig();
              config.verticalPosition = 'top';
              config.horizontalPosition = 'center';
              config.duration = 5000;
              this.snackBar.open('Organizer Registered Success', undefined, config);
              console.log('success');
              const dialogRef = this.dialog.open(DialogsOverviewExampleDialog, {
                width: '700px'
              });
              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
              });
            } else {
              const config = new MatSnackBarConfig();
              config.verticalPosition = 'top';
              config.horizontalPosition = 'center';
              config.duration = 5000;
              this.snackBar.open(res.message, undefined, config);
              // show error text;
            }
          }, (err) => {
            console.log(err);
            this.err = true;
          });
        }
      } else {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('email has already been registered', undefined, config);
      }
    } else if (!this.checked) {
      const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('please read the terms and privacy', undefined, config);
    } else {
      const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('please input correct information', undefined, config);
      return false;
    }
    
  }

  passwordValidator({value}: FormGroup) {
    const {password, confirm_password} = value;
    return password === confirm_password ? null : {passwordGroup: 'Passwords don\'t match!'};
  }
  onSignin() {
    this.router.navigate(['/users/login']);
  }
}

@Component({
  selector: 'dialogs-overview-example-dialog',
  templateUrl: 'dialogs.html',
  styleUrls: ['dialogs.scss']
})
export class DialogsOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogsOverviewExampleDialog>,
    private router: Router) {}
  OK(): void {
    this.dialogRef.close();
  }
}




