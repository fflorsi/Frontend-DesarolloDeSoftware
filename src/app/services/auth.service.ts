import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface AuthTokenPayload {
  exp: number;
  iat: number;
  role: string;
  username: string;
  clientId?: number;
  professionalId?: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
    clientId?: number;
    professionalId?: number;
  } | null;
  token: string | null;
  expiresAt: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    expiresAt: null
  });

  public authState$ = this.authStateSubject.asObservable();
  private tokenExpirationTimer: any;

  constructor(private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getStoredToken();
    if (token && this.isTokenValid(token)) {
      this.setAuthState(token);
    } else {
      this.clearAuthState();
    }
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  }

  private isTokenValid(token: string): boolean {
    try {
      const decodedToken = jwtDecode<AuthTokenPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }

  private setAuthState(token: string): void {
    try {
      const decodedToken = jwtDecode<AuthTokenPayload>(token);
      const expiresAt = new Date(decodedToken.exp * 1000);
      
      const authState: AuthState = {
        isAuthenticated: true,
        user: {
          username: decodedToken.username,
          role: decodedToken.role,
          clientId: decodedToken.clientId,
          professionalId: decodedToken.professionalId
        },
        token,
        expiresAt
      };

      this.authStateSubject.next(authState);
      this.scheduleTokenExpiration(decodedToken.exp);
      
      // Store token in localStorage for persistence
      localStorage.setItem('authToken', token);
      
    } catch (error) {
      console.error('Error setting auth state:', error);
      this.clearAuthState();
    }
  }

  private clearAuthState(): void {
    const authState: AuthState = {
      isAuthenticated: false,
      user: null,
      token: null,
      expiresAt: null
    };

    this.authStateSubject.next(authState);
    this.clearTokenExpiration();
    this.clearStoredData();
  }

  private scheduleTokenExpiration(exp: number): void {
    this.clearTokenExpiration();
    
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = (exp - currentTime) * 1000;
    
    // Schedule logout 30 seconds before token expires
    const logoutTime = Math.max(0, expirationTime - 30000);
    
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout('Token expired');
    }, logoutTime);
  }

  private clearTokenExpiration(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  private clearStoredData(): void {
    const keysToRemove = [
      'authToken',
      'token',
      'userRole',
      'clientId',
      'professionalId',
      'username'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  // Public authentication methods
  login(token: string): void {
    this.setAuthState(token);
  }

  logout(reason?: string): void {
    this.clearAuthState();
    
    if (reason) {
      console.log('Logout reason:', reason);
    }
    
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  getCurrentUser(): AuthState['user'] {
    return this.authStateSubject.value.user;
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  getUserRole(): string | null {
    return this.authStateSubject.value.user?.role || null;
  }

  getClientId(): number | undefined {
    return this.authStateSubject.value.user?.clientId;
  }

  getProfessionalId(): number | undefined {
    return this.authStateSubject.value.user?.professionalId;
  }

  getUsername(): string | null {
    return this.authStateSubject.value.user?.username || null;
  }

  getTokenExpirationInfo(): { expiresAt: Date; minutesUntilExpiration: number; isExpiringSoon: boolean } | null {
    const authState = this.authStateSubject.value;
    if (!authState.expiresAt) return null;

    const now = new Date();
    const minutesUntilExpiration = Math.floor((authState.expiresAt.getTime() - now.getTime()) / (1000 * 60));
    const isExpiringSoon = minutesUntilExpiration <= 5;

    return {
      expiresAt: authState.expiresAt,
      minutesUntilExpiration,
      isExpiringSoon
    };
  }

  // Role-based access control
  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }

  canAccess(requiredRole: string): boolean {
    return this.isAuthenticated() && this.hasRole(requiredRole);
  }

  // Security utilities
  isTokenExpiringSoon(): boolean {
    const info = this.getTokenExpirationInfo();
    return info ? info.isExpiringSoon : false;
  }

  getRemainingSessionTime(): string {
    const info = this.getTokenExpirationInfo();
    if (!info) return 'Unknown';

    const minutes = info.minutesUntilExpiration;
    if (minutes < 0) return 'Expired';
    if (minutes < 60) return `${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  // Redirect to appropriate dashboard based on role
  redirectToDashboard(): void {
    const role = this.getUserRole();
    
    switch (role) {
      case 'client':
        this.router.navigate(['/dashboard/personal-info']);
        break;
      case 'professional':
        this.router.navigate(['/profesional-dashboard/personal-info-pr']);
        break;
      case 'admin':
        this.router.navigate(['/menuAdmin']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}