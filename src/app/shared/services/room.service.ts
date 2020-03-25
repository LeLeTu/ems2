import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Room} from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:Enfec@13')
    })
  };
  constructor(private http: HttpClient) { }
  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${environment.API_URL}/room-api/room/search/${id}`);
  }
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.API_URL}/Room-api/room/searchall`, this.httpOptions);
  }
}
