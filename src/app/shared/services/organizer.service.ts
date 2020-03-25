import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  private fqdnApp = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  public createOrganizer(payload: any): Observable<any> {
    return this.http.post(this.fqdnApp + '/organizer-api/organizer/create', payload);
  }

  public editOrganizer(payload: any): Observable<any> {
    return this.http.put(this.fqdnApp + '/organizer-api/organizer/update', payload);
  }
  public searchOrganizer(id: number): Observable<any> {
    return this.http.get(this.fqdnApp + '/organizer-api/organizer/search/' + id);
  }
  public deleteOrganizer(id: string): Observable<any> {
    return this.http.get(this.fqdnApp + '/organizer-api/organizer/delete/' + id);
  }
  public addOrganizeraddress(payload: any): Observable<any> {
    return this.http.post(this.fqdnApp + '/organizer-api/organizer/address/create', payload);
  }                                       
  public searchOrganizeraddress(id: string): Observable<any> {
    return this.http.get(this.fqdnApp + '/organizer-api/organizer/address/search/' + id);
  }
  public updateOrganizeraddress(payload: any): Observable<any> {
    return this.http.put(this.fqdnApp + '/organizer-api/organizer/address/update', payload);
  }                                      
  public addOrganizercontact(payload: any): Observable<any> {
    return this.http.post(this.fqdnApp + '/organizer-api/organizer/contact/create', payload);
  }
  public searchOrganizercontact(id: string): Observable<any> {
    return this.http.get(this.fqdnApp + '/organizer-api/organizer/contact/search/' + id);
  }
  public updateOrganizercontact(payload: any): Observable<any> {
    return this.http.put(this.fqdnApp + '/organizer-api/organizer/contact/update', payload);
  }   
  public changeOrganizeremail(payload: any): Observable<any> {
    return this.http.post(this.fqdnApp + '/organizer-api/changeEmail', payload);
  }                                    
}


