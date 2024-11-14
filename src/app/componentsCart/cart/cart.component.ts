import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { Product } from '@app/interfaces/product';
import { OrderService } from '@app/services/order.service';  // Importamos el servicio de pedidos
import { Order, OrderItem } from '@app/interfaces/order';  // Asegúrate de importar la interfaz Order

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total: number = 0;

  constructor(
    private _cartService: CartService,
    private _orderService: OrderService  // Inyectamos el servicio de pedidos
  ) {}

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

  // Método para realizar el pedido
  checkout() {
    const orderItems: OrderItem[] = this.items.map(item => ({
      id: item.id || 0,  
      quantity: item.quantity || 1,  
      price: item.price,
      product: {
        id: item.id || 0,  
        name: item.name || 'Unknown Product'  
      }
    }));

    
    const order: Order = {
      items: orderItems,
      total: this.total,

    };

    this._orderService.createOrder(order).subscribe({
      next: (response) => {
        console.log('Pedido realizado con éxito', response);
        alert('Pedido realizado con éxito!');
        this.cleanCart();  
      },
      error: (error) => {
        console.error('Error al realizar el pedido', error);
        alert('Hubo un error al realizar el pedido');
      }
    });
  }
}
