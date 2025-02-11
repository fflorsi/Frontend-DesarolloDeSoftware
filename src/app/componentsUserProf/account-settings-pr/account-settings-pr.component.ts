import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-settings-pr',
  templateUrl: './account-settings-pr.component.html',
  styleUrls: ['./account-settings-pr.component.scss']
})
export class AccountSettingsPrComponent implements OnInit {
  newUsername: string = '';
  newPassword: string = '';
  isChangingUsername: boolean = false;
  isChangingPassword: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  toggleChange(field: string): void {
    if (field === 'username') {
      this.isChangingUsername = true;
      this.isChangingPassword = false;
    } else if (field === 'password') {
      this.isChangingPassword = true;
      this.isChangingUsername = false;
    }
  }

  updateUsername(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.id;

      this.userService.updateUsername(userId, this.newUsername).subscribe(
        () => {
          this.toastr.success('El nombre de usuario ha sido actualizado con éxito.', 'Actualización Exitosa');
          this.isChangingUsername = false;
        },
        (error) => {
          this.toastr.error('No se pudo actualizar el nombre de usuario.', 'Error');
          console.error('Error al actualizar nombre de usuario:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  updatePassword(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.id;

      this.userService.updatePassword(userId, this.newPassword).subscribe(
        () => {
          this.toastr.success('Contraseña actualizada correctamente.', 'Actualización Exitosa');
          this.isChangingPassword = false;
        },
        (error) => {
          this.toastr.error('No se pudo actualizar la contraseña.', 'Error');
          console.error('Error al actualizar contraseña:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }
}
