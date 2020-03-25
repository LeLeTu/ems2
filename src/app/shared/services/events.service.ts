import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Createevent} from '../models/createevent';
import {Organizer} from '../models/organizer';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:Enfec@13')
    })
  };
  // createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'Basic ' +
  //     btoa('ui:Enfec@ui')); 
  // }

  constructor(private http: HttpClient) { }
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.API_URL}/event-api/event/search`, this.httpOptions);
  }
  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${environment.API_URL}/event-api/event/search?event_id=${id}`, this.httpOptions);
  }
  getEventByDate(startdate: string, enddate: string, zipcode: string, eventtype: string) {
    return this.http.get<Event>(`${environment.API_URL}/event-api/event/search/by_date?start_date=${startdate}&end_date=${enddate}&zipcode=${zipcode}&event_type=${eventtype}`, this.httpOptions);
  }
  createEvent(event: Createevent): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${environment.API_URL}/event-api/event/create`, JSON.parse(JSON.stringify(event)), this.httpOptions);
  }
}
