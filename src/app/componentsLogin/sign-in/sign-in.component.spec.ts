import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'app/services/error.service';
import { FormsModule } from '@angular/forms';

// Crear mocks para los servicios
class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

class MockUserService {
  // Crear un espía para el método 'signInWithClient' de UserService
  signInWithClient = jasmine.createSpy('signInWithClient');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockErrorService {
  msjError = jasmine.createSpy('msjError');
}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let toastrService: ToastrService;
  let userService: UserService;
  let router: Router;
  let errorService: ErrorService;
  let signInWithClientSpy: jasmine.Spy; // Definir el espía

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [FormsModule], // Asegúrate de importar FormsModule para trabajar con formularios
      providers: [
        { provide: ToastrService, useClass: MockToastrService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    errorService = TestBed.inject(ErrorService);

    // Definir el espía y su tipo
    signInWithClientSpy = userService.signInWithClient as jasmine.Spy;

    fixture.detectChanges();
  });

  it('should show error when fields are empty', () => {
    // Arrange
    component.username = '';
    component.password = '';
    component.confirmPassword = '';
    component.dniClient = '';
    component.firstnameClient = '';
    component.lastnameClient = '';
    component.addressClient = '';
    component.phoneClient = '';
    component.emailClient = '';
    component.birthDateClient = null;

    // Act
    component.addUser();

    // Assert
    expect(toastrService.error).toHaveBeenCalledWith('Todos los campos son obligatorios', 'Error');
  });

  it('should show error when passwords do not match', () => {
    // Arrange
    component.username = 'testuser';
    component.password = 'password123';
    component.confirmPassword = 'password321'; // Las contraseñas no coinciden
    component.dniClient = '12345678';
    component.firstnameClient = 'John';
    component.lastnameClient = 'Doe';
    component.addressClient = '123 Main St';
    component.phoneClient = '5551234';
    component.emailClient = 'john.doe@example.com';
    component.birthDateClient = new Date();

    // Act
    component.addUser();

    // Assert
    expect(toastrService.error).toHaveBeenCalledWith('Las contraseñas ingresadas no coinciden', 'Error');
  });

  it('should call signInWithClient and navigate on successful sign-up', () => {
    // Arrange
    const fakeUser = { username: 'testuser', password: 'password123' };
    const fakeClient = {
      dni: '12345678',
      firstname: 'John',
      lastname: 'Doe',
      address: '123 Main St',
      phone: '5551234',
      email: 'john.doe@example.com',
      birthDate: new Date(),
    };
    const fakeResponse = { msg: 'Usuario registrado con éxito' };

    // Mock el retorno del servicio con un valor esperado
    signInWithClientSpy.and.returnValue(of(fakeResponse)); // Usar el espía

    component.username = 'testuser';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.dniClient = '12345678';
    component.firstnameClient = 'John';
    component.lastnameClient = 'Doe';
    component.addressClient = '123 Main St';
    component.phoneClient = '5551234';
    component.emailClient = 'john.doe@example.com';
    component.birthDateClient = new Date();

    // Act
    component.addUser();

    // Assert
    expect(signInWithClientSpy).toHaveBeenCalledWith(fakeUser, fakeClient);
    expect(toastrService.success).toHaveBeenCalledWith('El usuario testuser fue registrado con éxito', 'Usuario Registrado');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle error when sign-in fails', () => {
    // Arrange
    const errorResponse = new HttpErrorResponse({
      error: 'Error de servidor',
      status: 500,
      statusText: 'Internal Server Error',
    });
  
    // Simula un error al registrar
    signInWithClientSpy.and.returnValue(throwError(errorResponse)); // Usar el espía
  
    component.username = 'testuser';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.dniClient = '12345678';
    component.firstnameClient = 'John';
    component.lastnameClient = 'Doe';
    component.addressClient = '123 Main St';
    component.phoneClient = '5551234';
    component.emailClient = 'john.doe@example.com';
    component.birthDateClient = new Date();
  
    // Act
    component.addUser();
  
    // Assert
    expect(errorService.msjError).toHaveBeenCalledWith(errorResponse);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Ocurrió un error durante el registro. Por favor, inténtelo de nuevo más tarde.',
      'Error'
    );
  });
});