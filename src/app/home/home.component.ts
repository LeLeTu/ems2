import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {EventsService} from '../shared/services/events.service';
import {Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  startdate: string = '';
  enddate: string = '';
  zipcode: string = '';
  category: string = '';
  
  constructor(private formBuilder: FormBuilder,
              private es: EventsService,
              private router: Router,
              private as: AuthService) {}

  ngOnInit() {
  }
  onSubmit(value) {
    this.startdate = value.startdate.toLocaleString().split(',')[0];
    this.enddate = value.enddate.toLocaleString().split(',')[0];
    this.zipcode = value.Zipcode;
    this.category = value.category;
    this.router.navigate(['/specificproducts'], {queryParams: {startdate: this.startdate, enddate: this.enddate, zipcode: this.zipcode, category: this.category}});
  }
  
}
