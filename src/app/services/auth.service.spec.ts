import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('should return false when no token is present', () => {
      localStorage.clear();
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should return false when token is invalid', () => {
      localStorage.setItem('authToken', 'invalid.token.here');
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('getUserRole', () => {
    it('should return null when not authenticated', () => {
      localStorage.clear();
      expect(service.getUserRole()).toBeNull();
    });
  });

  describe('logout', () => {
    it('should clear auth state and navigate to login', () => {
      service.logout('Test reason');
      
      expect(service.isAuthenticated()).toBeFalse();
      expect(service.getCurrentUser()).toBeNull();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should clear localStorage data', () => {
      localStorage.setItem('authToken', 'test-token');
      localStorage.setItem('userRole', 'client');
      
      service.logout();
      
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('userRole')).toBeNull();
    });
  });

  describe('hasRole', () => {
    it('should return false when not authenticated', () => {
      expect(service.hasRole('client')).toBeFalse();
    });
  });

  describe('hasAnyRole', () => {
    it('should return false when not authenticated', () => {
      expect(service.hasAnyRole(['client', 'admin'])).toBeFalse();
    });
  });

  describe('canAccess', () => {
    it('should return false when not authenticated', () => {
      expect(service.canAccess('client')).toBeFalse();
    });
  });

  describe('redirectToDashboard', () => {
    it('should navigate to login when no user role', () => {
      service.redirectToDashboard();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('getTokenExpirationInfo', () => {
    it('should return null when no token', () => {
      localStorage.clear();
      expect(service.getTokenExpirationInfo()).toBeNull();
    });
  });

  describe('getRemainingSessionTime', () => {
    it('should return "Unknown" when no token info', () => {
      localStorage.clear();
      expect(service.getRemainingSessionTime()).toBe('Unknown');
    });
  });
});