import { Component } from '@angular/core';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  items= this._cartService.getItems();

  constructor(private _cartService: CartService){}

  clearCart(){
    this.items=this._cartService.clearCart();
  }
}
