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

  getPets(): Observable<Pet[]>{
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
