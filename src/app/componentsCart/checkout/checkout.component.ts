import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem } from '@app/interfaces/order';
import { CartService } from '@app/services/cart.service';
import { OrderService } from '@app/services/order.service';

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
      console.log(this.paymentId)
      this.savePayment(this.paymentId)
      this.getDetail(this.paymentId)
      this._cartService.cleanCart()
      }
  }

  savePayment(paymentId: string): void {
    this.orderService.savePayment(paymentId).subscribe(
      response => {
        console.log('Pago guardado con éxito:', response);
      },
      error => {
        console.error('Error al guardar el pago:', error);
      }
    );
  }
  getDetail(paymentId: string): void{
    this.orderService.getOrderByPaymentId(paymentId).subscribe(
      order => {
        this.order = order
        console.log('Orden obtenida:', this.order)
      },
      error => {
        console.error('Error al obtener la orden:', error);
      }
    )
  }
}

