import { Injectable } from '@angular/core';
import { Product } from 'app/interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = this.loadCart();  // Cargamos el carrito desde localStorage al iniciar
  private itemsSubject = new BehaviorSubject<Product[]>(this.items);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    // Si hay productos guardados en el localStorage, los cargamos en items
    const loadedCart = this.loadCart();
    if (loadedCart.length > 0) {
      this.items = loadedCart;
      this.itemsSubject.next(this.items);
    }
  }

  addToCart(product: Product) {
    console.log('Producto recibido en el carrito:', product);
  
    const existingProduct = this.items.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      if (existingProduct.quantity > product.stock) {
        existingProduct.quantity = product.stock;
        alert('Not enough stock available');
      }
    } else if (product.stock > 0) {
      this.items.push({ ...product, quantity: 1 });
      console.log('Producto agregado:', { ...product, quantity: 1 });
    } else {
      alert('Product out of stock');
    }
  
    this.itemsSubject.next(this.items);  // Actualiza el observable
    this.saveCart();  // Guarda el carrito en localStorage
    console.log('Estado actualizado del carrito:', this.items);
  }

  deleteProduct(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(this.items);
    this.saveCart();  // Guarda el carrito después de eliminar un producto
  }

  cleanCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
    this.saveCart();  // Guarda el carrito vacío
  }

  totalCart(): number {
    return this.items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }

  private saveCart() {
    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadCart(): Product[] {
    // Cargar el carrito desde localStorage
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
}
