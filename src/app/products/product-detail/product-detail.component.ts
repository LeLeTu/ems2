import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../shared/services/events.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Event} from '../../shared/models/event';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {Store} from '@ngrx/store';
import {AddItem} from '../../shared/actions/shopping-cart.action';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  event: Event;

  constructor(private router: ActivatedRoute,
              private es: EventsService,
              private shoppingCartService: ShoppingCartService,
              private rout: Router,
              private store: Store<{}>) { }

  ngOnInit() {
    this.router.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const id = +paramMap.get('id');
        return this.es.getEvent(id);
      })
    ).subscribe((res) => {
      // @ts-ignore
      this.event = res[0];
      console.log(this.event.event_id);
    });
  }
  goToRoom() {
    this.rout.navigate(['/rooms'], {queryParams: {event: this.event.event_id}});
  };
  addToCart() {
    // this.shoppingCartService.addToCart({
    //   qty: 1,
    //   product: this.product
    // });
    this.store.dispatch(new AddItem({
      qty: 1,
      event: this.event
    }));
  }
}
