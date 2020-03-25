// import { Component } from '@angular/core';
// import { Organizer } from './organizer';
// import { OrganizerService } from 'src/app/shared/services/organizer.service';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { HttpClient } from '@angular/common/http';




// @Component({
//   selector: 'app-organizer',
//   templateUrl: './organizer.component.html',
//   styleUrls: ['./organizer.component.scss']
// })
// export class OrganizerComponent {

//   model = new Organizer(1311, 'enfecems1@gmail.com', 'regal2', 'theater','bunny', 24, '12345678', 'regal.com', 339, '188 SW ST', 'Suite 12', 'bellevue', 'WA', '98005');

//   Copymodel = Object.assign({}, this.model);

//   display_personal =true;
//   display_basic = true;
//   display_contact = true;
//   display_address = true;
//   OrganizerService: any;
//   constructor(
//     private http: HttpClient,
//     private organizerService: OrganizerService
//   ) { }
//   onSavepersonal() {
//     var options = {
//       "email_address": this.model.emailaddress
//     };

//     this.organizerService.changeOrganizeremail(options).subscribe(
//       res => {
//         alert(res.message);
//       }
//     );
//   }

//   onSaveinfo() {
//     var options = {
//       "organizer_id": this.model.id,
//       "organizer_name": this.model.organizername,
//       "email_address": this.model.emailaddress,
//       "other_details": this.model.otherdetails
//     };

//     this.organizerService.editOrganizer(options).subscribe(
//       res => {
//         alert(res.message);
//       }
//     );
//   }

//   onSavecontact() {
//     var options = {
//       "organizer_id": this.model.id, 
//       "contact_id": this.model.contactid,
//       "contact_name": this.model.contactname,
//       "telephone": this.model.telephone,
//       "web_site_address": this.model.websiteaddress
//     };

//     this.organizerService.updateOrganizercontact(options).subscribe(
//       res => {
//         alert(res.message);
//       }
//     );
//   }


// onSaveaddress() {
//   var options = {
//     "organizer_id": this.model.id, 
//     "address_id": this.model.addressid,
//     "street1": this.model.street1,
//     "street2": this.model.street2,
//     "city": this.model.city,
//     "state": this.model.state,
//     "zip_code": this.model.zipcode, 
//     "other_details": this.model.otherdetails
//   };

//   this.organizerService.updateOrganizeraddress(options).subscribe(
//     res => {
//       alert(res.message);
//     }
//   );
// }

// Cancel() {
//   this.model = Object.assign({}, this.Copymodel);this.display_personal = true;  this.display_basic = true; this.display_contact = true; this.display_address = true;
// }

// get diagnostic() { return JSON.stringify(this.model); }

// }

import { Component, Input } from '@angular/core';
import { Organizer } from './organizer';
import { OrganizerService } from 'src/app/shared/services/organizer.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';




@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  /*GET response1, response2, response3

  parsedResponse1 = {"organizer_id": 1311, "email_address": "enfecems1@gmail.com" ...};
  parsedResponse2 = {"organizer_id": 1311, "email_address": "enfec***", "organizer_address": "***", ...}; 
  parsedResponse3 = {"organizer_id": 1311, "email_address": "enfec***", "contact_name": "enfec", ...}; 
  model2 = new Organizer(response1.get(0), response2.organizer_address, ...); */
  @Input() model:any = {};
  constructor(
    private http: HttpClient,
    private organizerService: OrganizerService,
    private as: AuthService
  ) { }
  Organizer_ID = 1311;

  ngOnInit(){
    this.as.organizerSubject.subscribe(res => {
      this.Organizer_ID = res.id;
    })
    console.log(this.Organizer_ID);
  //this.model = new Organizer(1311, 'enfecems1@gmail.com', 'regal2', 'theater','bunny', 24, '12345678', 'regal.com', 339, '188 SW ST', 'Suite 12', 'bellevue', 'WA', '98005');
    this.organizerService.searchOrganizer(this.Organizer_ID).subscribe(
      res => {
        if (res.message) {
          alert(res.message);
          return;
        }
        this.model = res;
      },
      error => {
        alert(JSON.stringify(error.error));
      }
    );
  }
  //model = new Organizer(1311, 'enfecems1@gmail.com', 'regal2', 'theater','bunny', 24, '12345678', 'regal.com', 339, '188 SW ST', 'Suite 12', 'bellevue', 'WA', '98005');

  
  Copymodel = Object.assign({}, this.model);

  display_personal =true;
  display_basic = true;
  display_contact = true;
  display_address = true;
  OrganizerService: any;


 /* getOrganizerBasicInfo(id: number): Observable<Object>{
    this.isLoading = true;
    this.searchedOrganizers = [];
    this.organizerService.searchOrganizer(id).subscribe(
      res => {
        this.isLoading = false;
        if (res.message) {
          alert(res.message);
          return;
        }
        this.searchedOrganizers = res;
      },
      error => {
        this.isLoading = false;
        alert(JSON.stringify(error.error));
      }
    );
    return searched
  }*/

  onSavepersonal(){
    var options = {
      "email_address": this.model.email_address
    };

  //  var result = this.getOrganizerBasicInfo(1311); 
    this.organizerService.changeOrganizeremail(options).subscribe(
      res => {
        alert(res.message);
      }
    );
  }

  onSaveinfo() {
    var options = {
      "organizer_id": this.model.organizer_id,
      "organizer_name": this.model.organizer_name,
      "email_address": this.model.email_address,
      "other_details": this.model.other_details
    };

    this.organizerService.editOrganizer(options).subscribe(
      res => {
        alert(res.message);
      }
    );
  }

  onSavecontact() {
    var options = {
      "organizer_id": this.model.organizer_id, 
      "contact_id": this.model.contact_id,
      "contact_name": this.model.contact_name,
      "telephone": this.model.telephone,
      "web_site_address": this.model.web_site_address
    };

    this.organizerService.updateOrganizercontact(options).subscribe(
      res => {
        alert(res.message);
      }
    );
  }


onSaveaddress() {
  var options = {
    "organizer_id": this.model.organizer_id, 
    "address_id": this.model.address_id,
    "street1": this.model.street1,
    "street2": this.model.street2,
    "city": this.model.city,
    "state": this.model.state,
    "zip_code": this.model.zipcode, 
    "other_details": this.model.other_details
  };

  this.organizerService.updateOrganizeraddress(options).subscribe(
    res => {
      alert(res.message);
    }
  );
}

Cancel() {
  this.model = Object.assign({}, this.Copymodel);this.display_personal = true;  this.display_basic = true; this.display_contact = true; this.display_address = true;
}

get diagnostic() { return JSON.stringify(this.model); }

}


