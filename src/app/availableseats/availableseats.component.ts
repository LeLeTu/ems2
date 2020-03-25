import { Component, OnInit } from '@angular/core';
import { AvailableseatService} from '../shared/services/availableseat.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Availableseat} from '../shared/models/availableseat';
import { MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store} from '@ngrx/store';
import { ShoppingCartService} from '../shared/services/shopping-cart.service';
import { AddItem } from '../shared/actions/shopping-cart.action';
import {EventsService} from '../shared/services/events.service';
@Component({
  selector: 'app-availableseats',
  templateUrl: './availableseats.component.html',
  styleUrls: ['./availableseats.component.scss']
})

export class AvailableseatsComponent implements OnInit {
  event: any;
  availableseat: Availableseat[];
  constructor(private router: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
     private eventService: EventsService,
     private  as: AvailableseatService,
     public dialog: MatDialog,
     private store: Store<{}>) { }
  displayedColumns: string[] = ['seat_id', 'row_number','col_number', 'price', 'checked'];
  params = {roomid: 0, event_id: 0};
  dataSource: MatTableDataSource<Availableseat[]>;
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      // @ts-ignore
      this.params.event_id = +params.event_id;
      this.params.roomid = +params.roomid;
    });
    this.as.getAvailableSeats(this.params.roomid).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].checked = false;
      }
      this.availableseat = res;
      // @ts-ignore
      this.dataSource = this.availableseat;
    });
    this.eventService.getEvent(this.params.event_id).subscribe(res => {
      this.event = res[0];
    });
  }
  addToCart() {
    for (let i = 0; i < this.availableseat.length; i++) {
      if(this.availableseat[i].checked) {
        this.store.dispatch(new AddItem({
          qty: 1,
          event: this.event
        }));
      }
    }
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 }
 @Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['dialog.scss']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private router: Router) {}
  continueshopping(): void {
    this.router.navigate(['products']);
    this.dialogRef.close();
  }
  shoppingcart(): void {
    this.router.navigate(['shopping-cart']);
    this.dialogRef.close();
  }

}