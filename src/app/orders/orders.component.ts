import { Component, OnInit } from '@angular/core';
import {Customerorder} from '../shared/models/customerorder';
import {CustomerorderService} from '../shared/services/customerorder.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  customerOrder: Customerorder = new Customerorder();
  constructor(private cs: CustomerorderService) { }
  ngOnInit(): void {
  }
  onSubmit() {
    this.cs.getCustomerOrder(this.customerOrder.customerOrderID).subscribe(res => {
      this.customerOrder = res[0];
    });
  }
}
