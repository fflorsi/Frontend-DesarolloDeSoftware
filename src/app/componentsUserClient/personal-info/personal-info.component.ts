import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@app/services/user.service';
import { ClientService } from '@app/services/client.service';
import { User } from '@app/interfaces/user';
import { Client } from '@app/interfaces/client';
import { response } from 'express';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  username: string | null = null;
  clientInfo: Client | null = null; 

  constructor(private userService: UserService, private clientService: ClientService) {}

  ngOnInit(): void {
    this.getUsernameFromToken();
    if (this.username) {
      this.fetchUserAndClientInfo(this.username);
    }
  }

  getUsernameFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      this.username = decodedToken.username;
    } else {
      console.error('Token no encontrado en localStorage.');
    }
  }

  fetchUserAndClientInfo(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: (user) => {
        if (user && user.id && user.clientId !== undefined) {
          this.fetchClientInfo(user.clientId);
        } else {
          console.error('Usuario o clientId no encontrado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    });
  }
  

  fetchClientInfo(clientId: number): void {
    this.clientService.getClientDetailById(clientId).subscribe(
      (response: any) => {  
        this.clientInfo = response.data;  
    },
    (error) => {
        console.error('Error fetching client data', error);
    }
    );
  }
}
