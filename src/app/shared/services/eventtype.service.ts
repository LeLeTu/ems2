import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Eventstatus} from '../models/eventstatus';
import {environment} from '../../../environments/environment';
import {Eventtype} from '../models/eventtype';

@Injectable({
  providedIn: 'root'
})
export class EventtypeService {

  constructor(private http: HttpClient) { }
  getEventtype(): Observable<Eventtype[]> {
    return this.http.get<Eventtype[]>(`${environment.API_URL}/refEventTypes-api/getallrefeventtypes`);
  }
}
