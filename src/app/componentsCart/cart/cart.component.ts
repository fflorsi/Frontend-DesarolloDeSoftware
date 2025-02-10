import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { Product } from '@app/interfaces/product';
import { OrderService } from '@app/services/order.service';
import { jwtDecode } from 'jwt-decode';
import { Order, OrderItem } from '@app/interfaces/order';
import { Router } from '@angular/router';
import { ClientService } from '@app/services/client.service';
import { Client } from '@app/interfaces/client';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total: number = 0;
  isUserLoggedIn: boolean = false; 
  clientInfo: Client | null = null;

  constructor(
    public clientService: ClientService,
    private _cartService: CartService,
    private _orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this._cartService.items$.subscribe(items => {
      this.items = items;
      this.total = this._cartService.totalCart();
      console.log('Productos en el carrito:', this.items);
      console.log('Total del carrito:', this.total);
    });

    // Verificar si el usuario está logueado
    this.checkUserLoginStatus();
  }

  // Método para verificar el estado de login del usuario
  checkUserLoginStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isUserLoggedIn = true;
      const clientId= this.getClientIdFromToken();
      if (clientId) {
        this.fetchClientInfo(clientId);
    }
      try {
        // Decodificar el token
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.isUserLoggedIn = false;
      }
    } else {
      this.isUserLoggedIn = false;
      console.log('No token found, user is not logged in');
    }
  }

  fetchClientInfo(clientId: number): void {
    this.clientService.getClientDetailById(clientId).subscribe(
      (response: any) => {  
        this.clientInfo = response.data; 
        console.log("Objeto cliente devuelto en el carrito: ", this.clientInfo)
      },
      (error) => {
        console.error('Error fetching client data', error);
      }
    );
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

  getClientIdFromToken(): number | undefined {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ clientId?: number }>(token);
        return decodedToken.clientId;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('Token no encontrado en localStorage.');
    }
    return undefined;
  }

  checkout() {
    if (!this.isUserLoggedIn) {
      alert('Necesitas iniciar sesión para realizar la compra');
      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);  // Redirige a la ruta '/login'
      return;
    }
  
    const clientId = this.getClientIdFromToken();  // Obtener el clientId del token
  
    if (!clientId) {
      alert('No se pudo obtener el cliente desde el token');
      return;
    }
  
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
      clientId: clientId,  
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


  checkoutTest(){
    if (!this.isUserLoggedIn) {
      alert('Necesitas iniciar sesión para realizar la compra');
      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);  // Redirige a la ruta '/login'
      return;
    }

    const itemsToPay = this.items.map(item => ({
    id: item.id?.toString() || "0",
    title: item.name || "Producto Desconocido",
    description: item.description || "Descripción no disponible",
    category_id: item.category?.toString() || "0",
    quantity: item.quantity || 1,
    unit_price: item.price
  }));
    const orderData = {
      payer: {
        email: this.clientInfo?.email,
        first_name: this.clientInfo?.firstname,
        last_name: this.clientInfo?.lastname,
        phone: {
          area_code: "54",
          number: this.clientInfo?.phone
        },
        address: {
          street_name: this.clientInfo?.address,
          street_number: "000",
          zip_code: "2000",
          city: "Rosario"
        },
        identification: {
          type: "DNI",
          number: this.clientInfo?.dni
        }
      },
      itemsToPay: itemsToPay
    }
    this._orderService.createOrderTest(orderData).subscribe({
    next: (response) => {
      const url = response.url;
      const paymentWindow = window.open(url);
      if (paymentWindow) {
        // Escuchar el evento de cierre de la ventana de pago
        const interval = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(interval);
            // Redirigir a /checkout después de que se cierre la ventana de pago
            this.router.navigate(['/checkout']);
          }
        }, 1000); // Verificar cada segundo si la ventana está cerrada
      } else {
        alert('Por favor, permite las ventanas emergentes para continuar con el pago.');
      }
    },
    error: (error) => {
      console.error('Error al realizar el pedido', error);
      alert('Hubo un error al realizar el pedido');
    }
  });
  }
}

