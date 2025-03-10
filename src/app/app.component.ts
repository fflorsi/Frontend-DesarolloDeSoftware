import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Cambié jwt_decode por jwtDecode
import { CartStateService } from './services/cart-state-service.service'; // Adjust the path as necessary

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuOpen = false;
  isUserLoggedIn: boolean = false;  // Variable para verificar si el usuario está logueado
  userRole: string = ''; // Para verificar el rol del usuario

  title = 'CRUDPET';

  constructor(
  private router: Router, 
  private cartStateService: CartStateService) { }

  ngOnInit() {
    this.checkUserLoginStatus();
  }

  // Verificar si el usuario está logueado y definir el rol
  checkUserLoginStatus() {
    const token = localStorage.getItem('authToken');  
    if (token) {
      this.isUserLoggedIn = true;
      try {
        // Decodificar el token
        const decodedToken: any = jwtDecode(token);
        this.userRole = decodedToken.role || ''; // Guardamos el rol
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.isUserLoggedIn = false;
      }
    } else {
      this.isUserLoggedIn = false;
    }
  }
  

  // Método para obtener el enlace correcto al dashboard
  getDashboardLink() {
    if (this.userRole === 'professional') {
      return '/profesional-dashboard';  // Link al dashboard del profesional
    } else if (this.userRole === 'client') {
      return '/dashboard/personal-info';  // Link al dashboard del cliente
    } else if (this.userRole === 'admin'){
      return 'menuAdmin'
    }
    return '/';  
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isUserLoggedIn = false;
    this.router.navigate(['/Home']);
  }
  

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  HomeClick() {
    this.router.navigate(['Home']);
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  openCart() {
    this.cartStateService.openCart(); 
  }

}
