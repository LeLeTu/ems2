import { Component, OnInit } from '@angular/core';
import {Room} from '../shared/models/room';
import {RoomService} from '../shared/services/room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Availableseat} from '../shared/models/availableseat';

export interface Element {
  room_name: string;
  room_capability: number;
  rate_for_day: number;
  other_details: string;
}
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  room: Room = new Room();
  rooms: Room[] = [];
  params = {event: ''};
  ele: Element[] = [];
  selectedRooms: Room[] = [];
  constructor(private rs: RoomService, private router: Router, private arouter: ActivatedRoute) { }
  displayedColumns: string[] = ['room_name', 'room_capability', 'rate_for_day', 'other_details', 'checkseat'];
  dataSource: MatTableDataSource<Element[]>;
  ngOnInit(): void {
    this.arouter.queryParams.subscribe(params => {
      // @ts-ignore
      this.params = params;
    });
    this.rs.getRooms().subscribe(res => {
      this.rooms = res;
      for (let i = 0; i < this.rooms.length; i++) {
        const eventid: number = +this.params.event;
        if (this.rooms[i].event_id === eventid) {
          const element = {room_name: '', room_capability: 0, rate_for_day: 0, other_details: '', room_id: 0, event_id: 0};
          element.room_name = this.rooms[i].room_name;
          element.room_capability = this.rooms[i].room_capability;
          element.rate_for_day = this.rooms[i].rate_for_day;
          element.other_details = this.rooms[i].other_details;
          element.room_id = this.rooms[i].room_id;
          element.event_id = this.rooms[i].event_id;
          this.ele.push(element);
        }
      }
      // @ts-ignore
      this.dataSource = this.ele;
    });
  }
  checkavailableseat(element) {
    this.router.navigate(['/availableseats'], {queryParams: {roomid: element.room_id, event_id: element.event_id}});
  }
  onSubmit() {
    this.rs.getRoom(this.room.room_id).subscribe(res => {
      this.room = res;
    });
  }

}
