import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-orangizerregisterconfirm',
  templateUrl: './orangizerregisterconfirm.component.html',
  styleUrls: ['./orangizerregisterconfirm.component.scss']
})
export class OrangizerregisterconfirmComponent implements OnInit {
  oToken = '';
  response = '';
  constructor(private acrouter: ActivatedRoute,
              private as: AuthService,
              private router: Router,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(params => {
      this.oToken = params.oToken;
    });
    this.as.oragnizerregisterconfirm(this.oToken).subscribe(res => {
      if (res.message === 'Customer account actived') {
        this.response = res.message;
        // this.router.navigate(['/users/login']);
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('Organizer account actived', undefined, config);
      }  else if (res.message === 'Organizer account activated already, please login'){
        this.router.navigate(['users/login']);
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('Organizer account activated already, please login', undefined, config);
    }
      else {
        this.response = res.message;
      }
    });
  }

}
