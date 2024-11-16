import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Client } from 'app/interfaces/client'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/users';
  }

  signIn(user:User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,user);
  }

 signInWithClient(user: User, client: Client): Observable<any> {
    const body = { user, client }; // Combina los objetos user y client en un solo objeto
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
}


  login(user: User): Observable<string>{
      return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`,user) 
  }
}
