import { Component, OnInit } from '@angular/core';
import {EventsService} from '../shared/services/events.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  events: Event[] = [];
  searchText;
  color: string;
  constructor(private es: EventsService) { }

  ngOnInit() {
    this.es.getEvents().subscribe( (res) => {
      this.events = res;
    });
  }
}
