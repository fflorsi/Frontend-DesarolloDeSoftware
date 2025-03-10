import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpenSubject.asObservable();

  openCart() {
    this.cartOpenSubject.next(true);
    console.log('Cart opened jeje');
  }

  closeCart() {
    this.cartOpenSubject.next(false);
    console.log('Cart closed');
  }
}