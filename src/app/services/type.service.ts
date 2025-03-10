import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '../interfaces/type';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = 'api/types';
  }

  public getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}