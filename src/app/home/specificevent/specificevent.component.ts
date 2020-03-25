import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {EventsService} from '../../shared/services/events.service';

@Component({
  selector: 'app-specificevent',
  templateUrl: './specificevent.component.html',
  styleUrls: ['./specificevent.component.scss']
})
export class SpecificeventComponent implements OnInit {
  events: Event[] = [];
  searchText;
  params = {startdate: '', enddate: '', zipcode: '', category: ''};
  constructor(private router: ActivatedRoute, private es: EventsService) { }
  ngOnInit(): void {
    this.router.queryParams.subscribe(
      (params) => {
        // @ts-ignore
        this.params = params;
      }
    );
    this.es.getEventByDate(this.params.startdate, this.params.enddate, this.params.zipcode, this.params.category).subscribe(
      (res) => {
        // @ts-ignore
        this.events = res;
      }
    );

  }

}
