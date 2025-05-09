import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/services/order.service';
import { Order } from '@app/interfaces/order';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  orders: Order[] = [];  
  monthlyEarnings: number = 0;
  loading: boolean = true;  

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.loadMonthlyEarnings();
  }

  fetchOrders(): void {
    this._orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;  
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.loading = false;  
      }
    });
  }

  loadMonthlyEarnings(): void {
    this._orderService.getMonthlyEarnings().subscribe({
      next: (data: any) => {
        this.monthlyEarnings = data.earnings;
        this.loading = false;  
      },
      error: (err) => {
        console.error('Error loading monthly earnings:', err);
        this.loading = false;  
      }
    });
  }
}
