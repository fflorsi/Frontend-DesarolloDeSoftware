import { Injectable } from '@angular/core';
import { Product } from 'app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

  addToCart(product: Product) {
    this.items.push(product);
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    return this.items;
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
