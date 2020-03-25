import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import {shoppingCartReducer} from './shared/reducers/shopping-cart.reducer';
import { AppRoutingModule } from './app-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { AppComponent } from './app.component';
import { FooterComponent } from './commons/footer/footer.component';
import { HeaderComponent } from './commons/header/header.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ProductsComponent } from './products/products.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { MatBadgeModule} from '@angular/material/badge';
import { MatRadioModule} from '@angular/material/radio';
import { MatExpansionModule} from '@angular/material/expansion';
import { CdkTableModule} from '@angular/cdk/table';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StoreModule} from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { SpecificeventComponent } from './home/specificevent/specificevent.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AvailableseatsComponent } from './availableseats/availableseats.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateeventComponent } from './createevent/createevent.component';
import { ForgetpasswordComponent } from './users/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './users/resetpassword/resetpassword.component';
import { TextMaskModule } from 'angular2-text-mask';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { PolicyComponent } from './users/register/policy/policy.component';
import { TermsComponent } from './users/register/terms/terms.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { RegisterconfirmComponent } from './users/registerconfirm/registerconfirm.component';
import { OrangizerregisterconfirmComponent } from './users/orangizerregisterconfirm/orangizerregisterconfirm.component';
import { OrgresetpasswordComponent } from './users/orgresetpassword/orgresetpassword.component';
import { ResetemailComponent } from './users/resetemail/resetemail.component';
import {OrganizerComponent} from './users/organizer/organizer.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    OrdersComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ShoppingCartComponent,
    SpecificeventComponent,
    RoomsComponent,
    AvailableseatsComponent,
    CreateeventComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    PolicyComponent,
    TermsComponent,
    UserInfoComponent,
    RegisterconfirmComponent,
    OrangizerregisterconfirmComponent,
    OrgresetpasswordComponent,
    ResetemailComponent,
    OrganizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatAutocompleteModule,
    TextMaskModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatStepperModule,
    CdkTableModule,
    MatDialogModule,
    FormsModule,
    MatRippleModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTabsModule,
    Ng2SearchPipeModule,
    NgxDaterangepickerMd,
    MatSnackBarModule,
    StoreModule.forRoot({
      items: shoppingCartReducer,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDRmUHSGdvGSNP3Nn8PYy-ET6dnYrJg1Ws',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
