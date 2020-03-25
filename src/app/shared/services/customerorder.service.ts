import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Availableseat} from '../models/availableseat';
import {environment} from '../../../environments/environment';
import { Customerorder } from '../models/customerorder';

@Injectable({
  providedIn: 'root'
})
export class CustomerorderService {
  constructor(private http: HttpClient) { }
  getCustomerOrder(id: number): Observable<Customerorder> {
    return this.http.get<Customerorder>(`${environment.API_URL}/customerOrder-api/CustomerOrder/${id}`);
  }
}
