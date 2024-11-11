import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { Product } from '@app/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this._cartService.items$.subscribe(items => {
      this.items = items;
      this.total = this._cartService.totalCart();
      console.log('Productos en el carrito:', this.items);
      console.log('Total del carrito:', this.total);
    });
  }

  deleteProduct(id: number) {
    this._cartService.deleteProduct(id);
  }

  cleanCart() {
    this._cartService.cleanCart();
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
