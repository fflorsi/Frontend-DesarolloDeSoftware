import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@app/services/user.service';
import { ClientService } from '@app/services/client.service';
import { User } from '@app/interfaces/user';
import { Client } from '@app/interfaces/client';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  username: string | null = null;
  clientInfo: Client | null = null;
  isEditing: boolean = false; // Estado para controlar el modo de edición

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

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  updateClientInfo(): void {
    if (this.clientInfo && this.clientInfo.id !== undefined) {
      this.clientService.updateClient(this.clientInfo.id, this.clientInfo).subscribe(
        (response) => {
          console.log('Información del cliente actualizada', response);
          this.isEditing = false; // Salir del modo de edición después de guardar
        },
        (error) => {
          console.error('Error al actualizar la información del cliente', error);
        }
      );
    } else {
      console.error('El cliente no tiene un ID válido');
    }
  }
}
