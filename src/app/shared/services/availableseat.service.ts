import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Availableseat} from '../models/availableseat';

@Injectable({
  providedIn: 'root'
})
export class AvailableseatService {
  constructor(private http: HttpClient) { }
  getAvailableSeats(id: number): Observable<Availableseat[]> {
    return this.http.get<Availableseat[]>(`${environment.API_URL}/seat-api/seat/getavailable/${id}`);
  }
}
