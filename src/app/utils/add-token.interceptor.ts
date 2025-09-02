import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { jwtDecode } from 'jwt-decode';

interface AuthTokenPayload {
  exp: number;
  iat: number;
  role: string;
  username: string;
  clientId?: number;
  professionalId?: number;
}

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router, private _errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get token from localStorage with fallback to both key names for compatibility
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    
    if (token && this.isTokenValid(token)) {
      request = this.addTokenToRequest(request, token);
    } else if (token) {
      // Token exists but is expired, clear it
      this.clearAuthData();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token expired'));
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else if (error.status === 403) {
          this._errorService.msjError(error);
          this.router.navigate(['/unauthorized']);
        } else if (error.status >= 500) {
          this._errorService.msjError(error);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }

  private isTokenValid(token: string): boolean {
    try {
      const decodedToken = jwtDecode<AuthTokenPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Check if token is expired (with 30 second buffer)
      return decodedToken.exp > (currentTime + 30);
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Clear invalid token and redirect to login
      this.clearAuthData();
      this._errorService.msjError({ message: 'Sesión expirada. Por favor, inicia sesión nuevamente.' } as any);
      this.router.navigate(['/login']);
      this.isRefreshing = false;
    }

    return throwError(() => new Error('Authentication failed'));
  }

  private clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    
    // Clear any other auth-related data
    const keysToRemove = ['userRole', 'clientId', 'professionalId', 'username'];
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  // Public method to check token validity
  public static isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<AuthTokenPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Public method to get user role
  public static getUserRole(): string | null {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<AuthTokenPayload>(token);
      return decodedToken.role;
    } catch (error) {
      return null;
    }
  }

  // Public method to get token expiration info
  public static getTokenExpirationInfo(): { expiresAt: Date; isExpiringSoon: boolean } | null {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<AuthTokenPayload>(token);
      const expiresAt = new Date(decodedToken.exp * 1000);
      const isExpiringSoon = (decodedToken.exp - Math.floor(Date.now() / 1000)) < 300; // 5 minutes

      return { expiresAt, isExpiringSoon };
    } catch (error) {
      return null;
    }
  }
}