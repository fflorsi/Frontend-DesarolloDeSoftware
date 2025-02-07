import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Client } from 'app/interfaces/client'

export interface LoginResponse {
  msg: string;
  token: string;
  user: User;
}


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
    const body = { user, client }; 
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
}


  login(user: User): Observable<LoginResponse>{
      return this.http.post<LoginResponse>(`${this.myAppUrl}${this.myApiUrl}/login`,user) 
  }

  getUserByUsername(username: string): Observable<User> {
    const params = { username }; 
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/getbyusername`, { params });
  }

  // Método para actualizar el nombre de usuario
  updateUsername(id: number, newUsername: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/updateusername/${id}`, { username: newUsername });
  }

  // Método para actualizar la contraseña
  updatePassword(id: number, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/updatepassword/${id}`, { password: newPassword });
  }
}
