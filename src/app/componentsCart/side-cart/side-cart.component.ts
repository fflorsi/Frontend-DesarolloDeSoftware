import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { Product } from '@app/interfaces/product';
import { Router } from '@angular/router';
import { CartStateService } from '@app/services/cart-state-service.service';


@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.scss']
})
export class SideCartComponent implements OnInit {
  isCartOpen = false;
  items: Product[] = [];
  total: number = 0;

  constructor(
    private _cartService: CartService,
    private router: Router,
    private cartStateService: CartStateService,

  ) {}

  ngOnInit() {
    this._cartService.items$.subscribe(items => {
      this.items = items;
      this.total = this._cartService.totalCart();

    });
    
    this.cartStateService.cartOpen$.subscribe(isOpen => {
      this.isCartOpen = isOpen;
    });
  }

  closeCart() {
    this.cartStateService.closeCart(); // Llama al método del servicio
  }

  deleteProduct(id: number) {
    this._cartService.deleteProduct(id);
  }

  increaseQuantity(item: Product) {
    const quantity = item.quantity || 1;

    if (quantity < item.stock) {
      this._cartService.updateQuantity(item, quantity + 1);
    } else {
      alert('No hay suficiente stock disponible');
    }
  }

  decreaseQuantity(item: Product) {
    const quantity = item.quantity || 1;

    if (quantity > 1) {
      this._cartService.updateQuantity(item, quantity - 1);
    }
  }
}