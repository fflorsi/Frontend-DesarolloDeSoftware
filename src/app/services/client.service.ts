import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from "../interfaces/client";


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  searchClients(searchString: string) {
    throw new Error('Method not implemented.');
  }
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/clients';
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  // Obtener cliente por DNI
  public getClientByDni(dni: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.myAppUrl}api/clients/dni/${dni}`, { headers, observe: 'response' });
  }
  
  // Eliminar cliente por ID
  public deleteClientById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Guardar cliente 
  public saveClient(client: Client): Observable<void> { 
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, client);
  }

  // Obtener detalle de cliente por ID
  public getClientDetailById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Editar cliente
  public updateClient(id: number, client: Client): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, client);
  }

  public searchClientsbyDNS(searchString: string): Observable<Client[]> {
    console.log(searchString)
    return this.http.get<Client[]>(`${this.myAppUrl}${this.myApiUrl}/search/${searchString}`);
  }

}

