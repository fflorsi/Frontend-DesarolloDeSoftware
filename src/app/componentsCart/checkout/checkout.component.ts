import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      }
    this._cartService.cleanCart()
  }

  savePayment(paymentId: string): void {
    console.log('Se llamó xd');
    this.orderService.savePayment(paymentId).subscribe(
      response => {
        console.log('Pago guardado con éxito:', response);
      },
      error => {
        console.error('Error al guardar el pago:', error);
      }
    );
  }
}