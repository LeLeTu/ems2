import { Component, OnInit } from '@angular/core';
import {VenueService} from '../shared/services/venue.service';
import {EventtypeService} from '../shared/services/eventtype.service';
import {EventstatusService} from '../shared/services/eventstatus.service';
import {Venue} from '../shared/models/venue';
import {Eventtype} from '../shared/models/eventtype';
import {Eventstatus} from '../shared/models/eventstatus';
import {Createevent} from '../shared/models/createevent';
import {EventsService} from '../shared/services/events.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.scss']
})
export class CreateeventComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  venues: Venue[] = [];
  createevent: Createevent = new Createevent();
  eventtypes: Eventtype[] = [];
  eventstatus: Eventstatus[] = [];
  constructor(private vs: VenueService,
              private ets: EventtypeService,
              private es: EventstatusService,
              private eventservice: EventsService,
              private formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              public as: AuthService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.vs.getVenues().subscribe(res => {
      this.venues = res;
    });
    this.ets.getEventtype().subscribe(res => {
      this.eventtypes = res;
    });
    this.firstFormGroup = this.formBuilder.group({
      event_type_code: this.eventtypes,
      venue_id: this.venues
    });
    this.secondFormGroup = this.formBuilder.group({
      commercial_type: '',
      event_name: '',
      event_start_time: '',
      starttimeclock: '',
      event_end_time: '',
      endtimeclock: '',
      timezone: ''
 
    });
    this.thirdFormGroup = this.formBuilder.group({
      number_of_participants: 0,
      derived_days_duration: 0,
      event_cost: 0,
      discount: 1,
      comments: '',
      url: ''
    });
  }
  onSubmit() {
    this.createevent.event_status_code = 9002;
    this.createevent.event_type_code = this.firstFormGroup.get('event_type_code').value;
    this.createevent.venue_id = this.firstFormGroup.get('venue_id').value;
    this.createevent.commercial_type = this.secondFormGroup.get('commercial_type').value;
    this.createevent.event_name = this.secondFormGroup.get('event_name').value;
    this.createevent.event_start_time = this.datePipe.transform(this.secondFormGroup.get('event_start_time').value, 'yyyy-MM-dd') + ' ' + this.secondFormGroup.get('starttimeclock').value + ':00';
    this.createevent.event_end_time = this.datePipe.transform(this.secondFormGroup.get('event_end_time').value, 'yyyy-MM-dd') + ' ' + this.secondFormGroup.get('endtimeclock').value + ':00';
    this.createevent.timezone = this.secondFormGroup.get('timezone').value;
    this.createevent.event_photo_url = this.thirdFormGroup.get('url').value;
    this.createevent.number_of_participants = this.thirdFormGroup.get('number_of_participants').value;
    this.createevent.derived_days_duration = this.thirdFormGroup.get('derived_days_duration').value;
    this.createevent.event_cost = this.thirdFormGroup.get('event_cost').value;
    this.createevent.discount = this.thirdFormGroup.get('discount').value;
    this.createevent.comments = this.thirdFormGroup.get('comments').value;
    this.as.userlogSubject.subscribe(res => {
      this.createevent.organizer_id = res.id;
    })
    console.log(this.createevent);
    this.eventservice.createEvent(this.createevent).subscribe( res => {
      if (res.message === 'Event successfully registered') {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        this.snackBar.open('Event successfully registered', undefined, config);
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
