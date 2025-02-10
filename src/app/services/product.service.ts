import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '@app/interfaces/product';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = 'api/products';
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  
  // Eliminar producto por ID
  public deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Guardar producto 
  public saveProduct(product: Product): Observable<void> { 
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product);
  }

  // Obtener detalle de producto por ID
  public getProductDetailById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Editar producto
  public updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, product);
  }
}
