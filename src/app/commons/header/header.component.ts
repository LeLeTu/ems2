import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {select, Store} from '@ngrx/store';
import {Item} from '../../shared/models/item';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  itemsCount$: Observable<number>;
  id: string;
  constructor(public authService: AuthService,
              private router: Router,
              private shoppingCartService: ShoppingCartService,
              private store: Store<{items: Item[]}>) {
    this.itemsCount$ = store.pipe(
      select('items'),
      map((items: Item[]) => {
        return items.length ? items.map(item => item.qty).reduce((a, b) => a + b) : 0;
      })
    );
  }

  ngOnInit() {
  }
  logout() {
    // this.authService.logout();
    this.authService.userlogSubject.next(null);
    this.authService.organizerSubject.next(null);
    this.router.navigate(['/users/login']);
  }

}
