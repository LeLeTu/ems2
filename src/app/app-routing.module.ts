import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {SpecificeventComponent} from './home/specificevent/specificevent.component';
import {RoomsComponent} from './rooms/rooms.component';
import {AvailableseatsComponent} from './availableseats/availableseats.component';
import {CreateeventComponent} from './createevent/createevent.component';
import {ForgetpasswordComponent} from './users/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './users/resetpassword/resetpassword.component';
import {UserInfoComponent} from './users/user-info/user-info.component';
import { RegisterconfirmComponent } from './users/registerconfirm/registerconfirm.component';
import { OrangizerregisterconfirmComponent } from './users/orangizerregisterconfirm/orangizerregisterconfirm.component';
import { OrgresetpasswordComponent } from './users/orgresetpassword/orgresetpassword.component';
import { ResetemailComponent } from './users/resetemail/resetemail.component';
import {OrganizerComponent} from './users/organizer/organizer.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'userinfo',
        component: UserInfoComponent
      },
      {
        path: 'organizerinfo',
        component: OrganizerComponent
      },
      {
        path: 'forgetpassword',
        component: ForgetpasswordComponent
      },
      {
        path: 'resetpassword',
        component: ResetpasswordComponent
      },
      {
        path: 'resetemail',
        component: ResetemailComponent
      },
      {
        path: 'orgresetpassword',
        component: OrgresetpasswordComponent
      },
      {
        path: 'registerconfirm',
        component: RegisterconfirmComponent
      }
    ]
  },
  {
    path: 'specificproducts',
    component: SpecificeventComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'organizer-api/registrationConfirm',
    component: OrangizerregisterconfirmComponent
  },
  {
    path: 'createevent',
    component: CreateeventComponent
  },
  {
    path: 'availableseats',
    component: AvailableseatsComponent
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent
      }
    ]
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
