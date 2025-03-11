import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/services/order.service';
import { Order } from '@app/interfaces/order';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {
  orders: Order[] = [];  
  monthlyEarnings: number = 0;
  loading: boolean = true;
  clientId: number | undefined= undefined;  

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this.clientId = this.getClientIdFromToken();
    if (this.clientId) {
      this.fetchOrders(this.clientId);
      this.loadMonthlyEarnings(this.clientId);

    } else {
      console.error('No se encontró el ID del cliente.');
      this.loading = false;
    }
  }

  getClientIdFromToken(): number | undefined {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ clientId?: number }>(token);
        return decodedToken.clientId;
      } catch (error) {
      }
    } else {
      console.error('Token no encontrado en localStorage.');
    }
    return undefined;
  }



  fetchOrders(clientId: number): void {
    this._orderService.getAllOrdersByClientId(clientId).subscribe({
      next: (data) => {
        this.orders = data;
        console.log(this.orders);
        this.loading = false;  
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.loading = false;  
      }
    });
  }


  loadMonthlyEarnings(clientId: number): void {
    this._orderService.getMonthlyEarningsByClientId(clientId).subscribe({
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

