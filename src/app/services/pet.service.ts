import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pet} from '../interfaces/pet';



@Injectable({
  providedIn: 'root'
})
export class PetService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/pets';
  }

  public getPets(): Observable<Pet[]>{
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  public getPetsByClient(id:number,): Observable<Pet[]>{
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}/by-client/${id}`)
  }

  public getPetDetaillById(id:number):Observable<Pet>{
    return this.http.get<Pet>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  public updatePet(id: number, pet: Pet): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, pet);
  }

  public savePet(pet: Pet): Observable<void> { 
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, pet);
  }
}
