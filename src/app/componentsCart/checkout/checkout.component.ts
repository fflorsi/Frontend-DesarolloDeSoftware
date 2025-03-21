import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem } from '@app/interfaces/order';
import { CartService } from '@app/services/cart.service';
import { OrderService } from '@app/services/order.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  paymentId: string | null = null;
  status: string | null = null;
  order: Order | null = null

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private _cartService: CartService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'];
      this.status = params['status'];
    });
    if (this.paymentId) {
      this.savePayment(this.paymentId)
      this._cartService.cleanCart()
      }
  }

  async savePayment(paymentId: string): Promise<void> {
    const clientId = this.getClientIdFromToken();
    
    if (clientId === undefined) {
        throw new Error("El ID del cliente no está disponible");
    }

    await this.orderService.savePayment(paymentId, clientId).subscribe(
        response => {
            this.getDetail(paymentId);
        },
        error => {
            console.error('Error al guardar el pago:', error);
            this.getDetail(paymentId);
        }
    );
}

   getDetail(paymentId: string): void{
    this.orderService.getOrderByPaymentId(paymentId).subscribe(
      order => {
        this.order = order
      },
      error => {
        console.error('Error al obtener la orden:', error);
      }
    )
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
}

