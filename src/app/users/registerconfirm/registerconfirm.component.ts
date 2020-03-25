import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-registerconfirm',
  templateUrl: './registerconfirm.component.html',
  styleUrls: ['./registerconfirm.component.scss']
})
export class RegisterconfirmComponent implements OnInit {
  cToken = '';
  response = '';
  constructor(private acrouter: ActivatedRoute,
              private as: AuthService,
              private router: Router,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(params => {
      this.cToken = params.cToken;
    });
    this.as.registerconfirm(this.cToken).subscribe(res => {
      if (res.message === 'Customer account actived') {
        this.response = res.message;
        // this.router.navigate(['/users/login']);
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('Customer account actived', undefined, config);
      } else if (res.message === 'Customer account actived already, please login'){
          this.router.navigate(['users/login']);
          const config = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          config.horizontalPosition = 'center';
          config.duration = 5000;
          this.snackBar.open('Customer account actived already, please login', undefined, config);
      }
      else {
        this.response = res.message;
      }
    });
  }

}