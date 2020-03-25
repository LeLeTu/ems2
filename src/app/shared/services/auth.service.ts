import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../models/user';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Userlogin } from '../models/userlogin';
import {Organizerlogin} from '../models/organizerlogin';
import {Organizer} from '../models/organizer';
import {Forgetpassword} from '../models/forgetpassword';
import {Resetpassword} from '../models/resetpassword';
import { UserLog } from '../models/userlog';
import {Availableseat} from '../models/availableseat';
import { Roles } from '../models/roles';
import { Changeemail } from '../models/changeemail';
import { Resetemail } from '../models/resetemail';
import { Orgforgetpassword } from '../models/orgforgetpassword';
import { Orgresetpassword } from '../models/orgresetpassword';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  checkLogin() {
    throw new Error("Method not implemented.");
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:Enfec@13')
    })
  };
  AUTH_API_URL = `${environment.API_URL}`;

  userlogSubject: Subject<UserLog> = new BehaviorSubject<UserLog>(null);
  organizerSubject: Subject<UserLog> = new BehaviorSubject<UserLog>(null);
  constructor(
    private http: HttpClient,
  ) {

  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/customer-api/Customers/${id}`, this.httpOptions);
  }
  updateUser(user: User): Observable<{message: string}> {
    return this.http.put<{message: string}>(`${environment.API_URL}/customer-api/Customer/Update`, user, this.httpOptions);
  }
  userlogin(userlogin: Userlogin): Observable<{message: string, CustomerID: number}> {
    return this.http.post<{message: string, CustomerID: number}>(`${this.AUTH_API_URL}/customer-api/Customers/Login`, userlogin, this.httpOptions);
  }
  organizerlogin(organizerlogin: Organizerlogin): Observable<{message: string, OrganizerID: string}> {
    return this .http.post<{message: string, OrganizerID: string}>(`${this.AUTH_API_URL}/organizer-api/organizer/login`, organizerlogin);
  }
  register(user: User): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.AUTH_API_URL}/customer-api/Customer/Register`, user, this.httpOptions);
  }
  organizerregister(organizer: Organizer): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.AUTH_API_URL}/organizer-api/organizer/create`, organizer);
  }
  forgetpassword(forget: Forgetpassword): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.AUTH_API_URL}/customer-api/forget_password`, forget, this.httpOptions);
  }
  resetpassword(reset: Resetpassword): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.AUTH_API_URL}/customer-api/reset_password?cToken=${reset.customerToken}`, reset, this.httpOptions);
  }
  registerconfirm(cToken: string): Observable<{message: string}> {
    return this.http.get<{message: string}>(`${this.AUTH_API_URL}/customer-api/registrationConfirm?cToken=${cToken}`, this.httpOptions);
  }
  oragnizerregisterconfirm(oToken: string): Observable<{message: string}> {
    return this.http.get<{message: string}>(`${this.AUTH_API_URL}/organizer-api/registrationConfirm?oToken=${oToken}`, this.httpOptions);
  }
  orgforgetpassword(forget: Orgforgetpassword): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.AUTH_API_URL}/organizer-api/forget_password`, forget, this.httpOptions);
  }
  orgresetpassword(reset: Orgresetpassword): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.AUTH_API_URL}/organizer-api/reset_password?oToken=${reset.organizerToken}`, reset, this.httpOptions);
  }
  getRole(role: Roles):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.AUTH_API_URL}/customer-api/LoginRole`, role, this.httpOptions )
  }
  getAllCustomer(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/customer-api/AllCustomers`, this.httpOptions);
  }
  changeEmail(changeEmail: Changeemail): Observable<{message: string}> {
    return this.http.post<{message:string}>(`${this.AUTH_API_URL}/customer-api/changeEmail`, changeEmail, this.httpOptions )
  }
  resetEmail(resetEmail: Resetemail): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.AUTH_API_URL}/customer-api/reset_email?cToken=${resetEmail.customerToken}`, resetEmail, this.httpOptions);
  }
}
