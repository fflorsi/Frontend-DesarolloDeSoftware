import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '@app/interfaces/order';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private myAppUrl: string;
  private myApiUrl: string;
  private paymentUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = 'api/orders';
    this.paymentUrl = 'api/payment'
  }

  // Crear un nuevo pedido
  createOrder(order: Order): Observable<{ message: string; order: Order }> {
    return this.http.post<{ message: string; order: Order }>(`${this.myAppUrl}${this.myApiUrl}`, order);
  }

  createOrderTest(orderData:any): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/payment/create', orderData)
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

  getAllOrdersByClientId(clientId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/clientorders/${clientId}`);
  }

  getMonthlyEarningsByClientId(clientId: number): Observable<{ earnings: number }> {
    return this.http.get<{ earnings: number }>(`${this.myAppUrl}${this.myApiUrl}/clientearnings/${clientId}`);
  }

  getPaymentStatus(paymentId: string): Observable<any> {
    return this.http.get(`${this.myApiUrl}/status/${paymentId}`);
  }

  savePayment(paymentId: string): Observable<any> {
    console.log(paymentId);
    return this.http.post(`${this.myAppUrl}${this.paymentUrl}/save/${paymentId}`, {});
  }
}
