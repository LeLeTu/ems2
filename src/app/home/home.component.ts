import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

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
              private router: Router,
              ) {}

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
