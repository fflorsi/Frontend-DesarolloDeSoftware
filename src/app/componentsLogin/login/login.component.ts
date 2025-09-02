import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from 'app/interfaces/user.js';
import { LoginResponse, UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'app/services/error.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  showPassword: boolean = false;
  rememberMe: boolean = false;
  
  // Form validation
  submitted: boolean = false;
  loginAttempts: number = 0;
  maxLoginAttempts: number = 5;
  isAccountLocked: boolean = false;
  lockoutTime: number = 300000; // 5 minutes

  constructor(
    private toastr: ToastrService, 
    private _userService: UserService, 
    private router: Router,
    private _errorService: ErrorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.authService.redirectToDashboard();
      return;
    }

    // Check for account lockout
    this.checkAccountLockout();
    
    // Load remember me data
    this.loadRememberedCredentials();
  }

  private checkAccountLockout(): void {
    const lockoutData = localStorage.getItem('loginLockout');
    if (lockoutData) {
      const { attempts, timestamp } = JSON.parse(lockoutData);
      const timePassed = Date.now() - timestamp;
      
      if (attempts >= this.maxLoginAttempts && timePassed < this.lockoutTime) {
        this.isAccountLocked = true;
        this.loginAttempts = attempts;
        
        // Auto-unlock after lockout period
        setTimeout(() => {
          this.unlockAccount();
        }, this.lockoutTime - timePassed);
      } else if (timePassed >= this.lockoutTime) {
        this.unlockAccount();
      } else {
        this.loginAttempts = attempts;
      }
    }
  }

  private unlockAccount(): void {
    this.isAccountLocked = false;
    this.loginAttempts = 0;
    localStorage.removeItem('loginLockout');
    this.toastr.info('Cuenta desbloqueada. Puedes intentar iniciar sesión nuevamente.', 'Información');
  }

  private loadRememberedCredentials(): void {
    const rememberedData = localStorage.getItem('rememberedCredentials');
    if (rememberedData) {
      const { username, rememberMe } = JSON.parse(rememberedData);
      this.username = username;
      this.rememberMe = rememberMe;
    }
  }

  private saveRememberedCredentials(): void {
    if (this.rememberMe) {
      localStorage.setItem('rememberedCredentials', JSON.stringify({
        username: this.username,
        rememberMe: this.rememberMe
      }));
    } else {
      localStorage.removeItem('rememberedCredentials');
    }
  }

  private recordFailedAttempt(): void {
    this.loginAttempts++;
    
    if (this.loginAttempts >= this.maxLoginAttempts) {
      this.isAccountLocked = true;
      localStorage.setItem('loginLockout', JSON.stringify({
        attempts: this.loginAttempts,
        timestamp: Date.now()
      }));
      
      this.toastr.error(
        `Demasiados intentos fallidos. Tu cuenta está bloqueada por ${this.lockoutTime / 60000} minutos.`,
        'Cuenta Bloqueada'
      );
      
      // Auto-unlock after lockout period
      setTimeout(() => {
        this.unlockAccount();
      }, this.lockoutTime);
    } else {
      localStorage.setItem('loginLockout', JSON.stringify({
        attempts: this.loginAttempts,
        timestamp: Date.now()
      }));
      
      const remainingAttempts = this.maxLoginAttempts - this.loginAttempts;
      this.toastr.warning(
        `Credenciales incorrectas. Te quedan ${remainingAttempts} intentos.`,
        'Error de Autenticación'
      );
    }
  }

  private clearFailedAttempts(): void {
    this.loginAttempts = 0;
    localStorage.removeItem('loginLockout');
  }

  // Form validation methods
  get isFormValid(): boolean {
    return this.username.trim().length >= 3 && 
           this.password.length >= 6 && 
           !this.isAccountLocked;
  }

  get usernameErrors(): string[] {
    const errors: string[] = [];
    if (this.submitted && this.username.trim().length === 0) {
      errors.push('El nombre de usuario es requerido');
    } else if (this.submitted && this.username.trim().length < 3) {
      errors.push('El nombre de usuario debe tener al menos 3 caracteres');
    }
    return errors;
  }

  get passwordErrors(): string[] {
    const errors: string[] = [];
    if (this.submitted && this.password.length === 0) {
      errors.push('La contraseña es requerida');
    } else if (this.submitted && this.password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    return errors;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.submitted = true;

    if (!this.isFormValid) {
      if (this.isAccountLocked) {
        this.toastr.error('Tu cuenta está temporalmente bloqueada. Intenta más tarde.', 'Cuenta Bloqueada');
      } else {
        this.toastr.error('Por favor, corrige los errores en el formulario', 'Error de Validación');
      }
      return;
    }

    // Sanitize and validate input
    const sanitizedUser: User = { 
      username: this.username.trim().toLowerCase(), 
      password: this.password.trim()
    };

    this.loading = true;

    this._userService.login(sanitizedUser).subscribe({
      next: (response: LoginResponse) => {
        try {
          // Validate token before proceeding
          if (!response.token || response.token.split('.').length !== 3) {
            throw new Error('Token inválido recibido del servidor');
          }

          // Clear failed attempts on successful login
          this.clearFailedAttempts();
          
          // Save credentials if remember me is checked
          this.saveRememberedCredentials();

          // Use AuthService for login
          this.authService.login(response.token);
          
          this.toastr.success('¡Bienvenido! Inicio de sesión exitoso.', 'Éxito');
          
          // Redirect to appropriate dashboard
          setTimeout(() => {
            this.authService.redirectToDashboard();
          }, 1000);

        } catch (error) {
          console.error('Error al procesar la respuesta de login:', error);
          this.toastr.error('Error al procesar la respuesta del servidor', 'Error');
          this.loading = false;
        }
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        
        // Record failed attempt
        this.recordFailedAttempt();
        
        // Handle specific error cases
        if (e.status === 401) {
          // Don't show additional error as recordFailedAttempt already shows one
        } else if (e.status === 429) {
          this.toastr.error('Demasiados intentos. Por favor, espera antes de intentar nuevamente.', 'Límite de Intentos');
        } else {
          this._errorService.msjError(e);
        }
      },
    });
  }

  getRemainingLockoutTime(): string {
    const lockoutData = localStorage.getItem('loginLockout');
    if (!lockoutData) return '';
    
    const { timestamp } = JSON.parse(lockoutData);
    const remainingTime = this.lockoutTime - (Date.now() - timestamp);
    const minutes = Math.ceil(remainingTime / 60000);
    
    return `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  }

  // Security helpers
  onUsernameChange(): void {
    // Basic input sanitization
    this.username = this.username.replace(/[<>]/g, '');
  }

  onPasswordChange(): void {
    // Remove any script tags or dangerous characters
    this.password = this.password.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
}


  