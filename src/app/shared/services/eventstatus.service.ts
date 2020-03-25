import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Eventstatus} from '../models/eventstatus';

@Injectable({
  providedIn: 'root'
})
export class EventstatusService {
  
  constructor(private http: HttpClient) { }
  getEventstatus(): Observable<Eventstatus[]> {
    return this.http.get<Eventstatus[]>(`${environment.API_URL}/refEventStatus-api/getallrefeventstatus`);
  }
}
