import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@app/services/user.service';
import { ProfessionalService } from '@app/services/professional.service';
import { User } from '@app/interfaces/user';
import { Professional } from '@app/interfaces/professional';

@Component({
  selector: 'app-personal-info-pr',
  templateUrl: './personal-info-pr.component.html',
  styleUrls: ['./personal-info-pr.component.scss']
})
export class PersonalInfoPrComponent implements OnInit {
  username: string | null = null;
  professionalInfo: Professional | null = null;
  isEditing: boolean = false; // Estado para controlar el modo de edición

  constructor(private userService: UserService, private professionalService: ProfessionalService) {}

  ngOnInit(): void {
    this.getUsernameFromToken();
    if (this.username) {
      this.fetchUserAndProfessionalInfo(this.username);
    }
  }

  getUsernameFromToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      this.username = decodedToken.username;
    } else {
      console.error('Token no encontrado en localStorage.');
    }
  }

  fetchUserAndProfessionalInfo(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: (user) => {
        if (user && user.id && user.professionalId !== undefined) {
          this.fetchProfessionalInfo(user.professionalId);
        } else {
          console.error('Usuario o professionalId no encontrado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    });
  }

  fetchProfessionalInfo(professionalId: number): void {
    this.professionalService.getProfessionalDetailById(professionalId).subscribe(
      (response: any) => {
        this.professionalInfo = response.data;
      },
      (error) => {
        console.error('Error fetching professional data', error);
      }
    );
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  updateProfessionalInfo(): void {
    if (this.professionalInfo && this.professionalInfo.id !== undefined) {
      this.professionalService.updateProfessional(this.professionalInfo.id, this.professionalInfo).subscribe(
        (response) => {
          console.log('Información del profesional actualizada', response);
          this.isEditing = false; // Salir del modo de edición después de guardar
        },
        (error) => {
          console.error('Error al actualizar la información del profesional', error);
        }
      );
    } else {
      console.error('El profesional no tiene un ID válido');
    }
  }
}
