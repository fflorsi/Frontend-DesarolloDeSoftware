import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '@app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/orders';
  }
  // Crear un nuevo pedido
  createOrder(order: Order): Observable<{ message: string; order: Order }> {
    return this.http.post<{ message: string; order: Order }>(`${this.myAppUrl}${this.myApiUrl}`, order);
  }

  // Obtener todos los pedidos
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Obtener un pedido por su ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Obtener ganancias mensuales
  getMonthlyEarnings(): Observable<{ earnings: number }> {
    return this.http.get<{ earnings: number }>(`${this.myAppUrl}${this.myApiUrl}/monthly-earnings`);
  }
}
