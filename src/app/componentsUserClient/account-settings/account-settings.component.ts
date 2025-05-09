import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  newUsername: string = '';
  newPassword: string = '';
  isChangingUsername: boolean = false;
  isChangingPassword: boolean = false;
  currentUsername: string = '';
  
  constructor(private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCurrentUsername();
  }

  getCurrentUsername(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.id; // Obtener id desde el token

      this.userService.getUserById(userId).subscribe(
        (user: { username: string }) => {
          this.currentUsername = user.username;
        },
        (error: any) => {
          console.error('Error al obtener el nombre de usuario actual:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  // Toggle para seleccionar qué campo cambiar
  toggleChange(field: string): void {
    if (field === 'username') {
      this.isChangingUsername = true;
      this.isChangingPassword = false;
    } else if (field === 'password') {
      this.isChangingPassword = true;
      this.isChangingUsername = false;
    }
  }

  // Método para actualizar solo el nombre de usuario
  updateUsername(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.id; // Obtener id desde el token

      this.userService.updateUsername(userId, this.newUsername).subscribe(
        (response) => {
          this.toastr.success('El nombre de usuario ha sido actualizado con éxito.', 'Actualización Exitosa');
          this.isChangingUsername = false; // Cerrar formulario
        },
        (error) => {
          this.toastr.error('No se pudo actualizar el nombre de usuario.', 'Error');
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  // Método para actualizar solo la contraseña
  updatePassword(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.id; // Obtener id desde el token

      this.userService.updatePassword(userId, this.newPassword).subscribe(
        (response) => {
          this.isChangingPassword = false; // Cerrar formulario
        },
        (error) => {
          console.error('Error al actualizar la contraseña:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  cancelChange() {
    this.isChangingUsername = false;
    this.isChangingPassword = false;
  }
}
