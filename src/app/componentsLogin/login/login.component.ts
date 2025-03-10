import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from 'app/interfaces/user.js';
import { LoginResponse, UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'app/services/error.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, 
    private _userService: UserService, 
    private router: Router,
    private _errorService: ErrorService) {

  }

  ngOnInit(): void {

  }

  login() {
    if (this.username === '' || this.password === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
  
    const user: User = { username: this.username, password: this.password };
    this.loading = true;
  
    this._userService.login(user).subscribe({
      next: (response: LoginResponse) => {
        const token = response.token;
        localStorage.removeItem('authToken');
        localStorage.setItem('authToken', token);
  
        try {
          const decodedToken = jwtDecode<any>(token);
          const userRole = decodedToken.role;
          console.log(userRole)
          
          // Redirigir según el rol del usuario
          if (userRole === 'client') {
            this.router.navigate(['/dashboard']);
          } else if (userRole === 'professional') {
            this.router.navigate(['/profesional-dashboard']);
          } else if (userRole === 'admin') {
            this.router.navigate(['/menuAdmin']); // Redirigir al dashboard de administrador
          } else {
            this.router.navigate(['/unauthorized']);
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.toastr.error('Token inválido', 'Error');
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      },
    });
  }

}


  