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
  clientId: number | undefined = undefined;
  clientInfo: Client | null = null;
  isEditing: boolean = false; // Estado para controlar el modo de edición

  constructor(private userService: UserService, private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientId= this.getClientIdFromToken();
    if (this.clientId) {
      this.fetchClientInfo(this.clientId);
    }

  }

  getClientIdFromToken(): number | undefined {
      const token = localStorage.getItem('authToken');
      console.log(token)
      if (token) {
        try {
          const decodedToken = jwtDecode<{ clientId?: number }>(token);
          console.log('Decoded Token:', decodedToken);  // Ver contenido del token
          return decodedToken.clientId;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      } else {
        console.error('Token no encontrado en localStorage.');
      }
      return undefined;
    }

  fetchClientInfo(clientId: number): void {
    this.clientService.getClientDetailById(clientId).subscribe(
      (response: any) => {  
        this.clientInfo = response.data; 
        console.log("Objeto cliente devuelto: ", this.clientInfo)
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
