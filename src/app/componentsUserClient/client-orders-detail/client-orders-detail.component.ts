import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@app/services/order.service';
import { Order } from '@app/interfaces/order';

@Component({
  selector: 'app-client-orders-detail',
  templateUrl: './client-orders-detail.component.html',
  styleUrls: ['./client-orders-detail.component.scss']  
})
export class ClientOrdersDetailComponent implements OnInit {
  order: Order | null = null;
  orderId: number | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderid');  // Asegúrate de que el nombre coincida
    if (orderId) {
      this.orderId = parseInt(orderId);
      this.loadOrder(this.orderId);  
    }
  }

  loadOrder(id: number): void {
    this.orderService.getOrderById(id).subscribe({
      next: (data) => {
        this.order = data;
      },
      error: (err) => {
        console.error('Error loading order:', err); 
      }
    });
  }
}