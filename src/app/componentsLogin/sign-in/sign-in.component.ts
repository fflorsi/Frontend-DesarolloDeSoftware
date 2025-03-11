import { Component } from '@angular/core';
import * as router from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/interfaces/user';
import {UserService} from 'app/services/user.service';
import {Router} from '@angular/router';
import { HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'app/services/error.service';
import { Client } from 'app/interfaces/client';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  // Variables para los datos del cliente
  dniClient: string = '';
  firstnameClient: string = '';
  lastnameClient: string = '';
  addressClient: string = '';
  phoneClient: string = '';
  emailClient: string = '';
  birthDateClient: Date | null = null;
  
  loading: boolean = false;

  constructor(private toastr: ToastrService, 
              private _userService: UserService, 
              private router: Router,
              private _errorService: ErrorService){}
            
              addUser() {
                // Validar campos vacíos
                if (
                  this.username == '' ||
                  this.password == '' ||
                  this.confirmPassword == '' ||
                  this.dniClient == '' ||
                  this.firstnameClient == '' ||
                  this.lastnameClient == '' ||
                  this.addressClient == '' ||
                  this.phoneClient == '' ||
                  this.emailClient == '' ||
                  !this.birthDateClient
                ) {
                  this.toastr.error('Todos los campos son obligatorios', 'Error');
                  return;
                }
              
                // Validar que las contraseñas coincidan
                if (this.password !== this.confirmPassword) {
                  this.toastr.error('Las contraseñas ingresadas no coinciden', 'Error');
                  return;
                }
              
                // Crear el objeto User
                const user: User = {
                  username: this.username,
                  password: this.password,
                };
              
                // Crear el objeto Client
                const client: Client = {
                  dni: this.dniClient,
                  firstname: this.firstnameClient,
                  lastname: this.lastnameClient,
                  address: this.addressClient,
                  phone: this.phoneClient,
                  email: this.emailClient,
                  birthDate: this.birthDateClient,
                };
              
                this.loading = true;
              
                // Enviar tanto el usuario como el cliente
                this._userService.signInWithClient(user, client).subscribe({
                  next: (v) => {
                    this.loading = false;
                    this.toastr.success(
                      `El usuario ${this.username} fue registrado con éxito`,
                      'Usuario Registrado'
                    );
                    this.router.navigate(['/login']);
                  },
                  error: (e: HttpErrorResponse) => {
                    this.loading = false;
                    this._errorService.msjError(e); // Llamar al servicio de errores
                    this.toastr.error(
                      'Ocurrió un error durante el registro. Por favor, inténtelo de nuevo más tarde.',
                      'Error'
                    ); // Mostrar mensaje de error con Toastr
                  },
                });
              }
}

