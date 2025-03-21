import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; 

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken = jwtDecode<any>(token);
      const userRole = decodedToken.role;
      const expectedRole = route.data['role'] as string;
      if (expectedRole && userRole !== expectedRole) {
        this.router.navigate(['/Home']); 
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
