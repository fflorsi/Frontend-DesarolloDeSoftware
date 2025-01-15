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
  
  constructor(private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.id; // Obtener id desde el token

      this.userService.updatePassword(userId, this.newPassword).subscribe(
        (response) => {
          console.log('Contraseña actualizada:', response);
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
}
