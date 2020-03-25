import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Eventtype} from '../models/eventtype';
import {environment} from '../../../environments/environment';
import {Venue} from '../models/venue';

@Injectable({
  providedIn: 'root'
})
export class VenueService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:Enfec@13')
    })
  };
  constructor(private http: HttpClient) { }
  getVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${environment.API_URL}/Venue-api/venue/searchall`, this.httpOptions);
  }
}
