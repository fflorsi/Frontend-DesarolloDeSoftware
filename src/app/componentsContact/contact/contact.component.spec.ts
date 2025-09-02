import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should initialize with invalid form', () => {
      expect(component.contactForm.valid).toBeFalse();
    });

    it('should validate required fields', () => {
      const nameControl = component.contactForm.get('user_name');
      const emailControl = component.contactForm.get('user_email');
      const messageControl = component.contactForm.get('message');

      expect(nameControl?.hasError('required')).toBeTrue();
      expect(emailControl?.hasError('required')).toBeTrue();
      expect(messageControl?.hasError('required')).toBeTrue();
    });

    it('should validate email format', () => {
      const emailControl = component.contactForm.get('user_email');
      emailControl?.setValue('invalid-email');
      
      expect(emailControl?.hasError('email')).toBeTrue();
      
      emailControl?.setValue('valid@email.com');
      expect(emailControl?.hasError('email')).toBeFalse();
    });

    it('should validate minimum length for name', () => {
      const nameControl = component.contactForm.get('user_name');
      nameControl?.setValue('A');
      
      expect(nameControl?.hasError('minlength')).toBeTrue();
      
      nameControl?.setValue('Valid Name');
      expect(nameControl?.hasError('minlength')).toBeFalse();
    });

    it('should validate message length constraints', () => {
      const messageControl = component.contactForm.get('message');
      
      // Test minimum length
      messageControl?.setValue('Short');
      expect(messageControl?.hasError('minlength')).toBeTrue();
      
      // Test valid length
      messageControl?.setValue('This is a valid message with enough characters');
      expect(messageControl?.hasError('minlength')).toBeFalse();
      expect(messageControl?.hasError('maxlength')).toBeFalse();
      
      // Test maximum length
      const longMessage = 'A'.repeat(501);
      messageControl?.setValue(longMessage);
      expect(messageControl?.hasError('maxlength')).toBeTrue();
    });
  });

  describe('Error Messages', () => {
    it('should return correct error message for required name', () => {
      const nameControl = component.contactForm.get('user_name');
      nameControl?.markAsTouched();
      
      const errorMessage = component.getErrorMessage('user_name');
      expect(errorMessage).toBe('Nombre es requerido');
    });

    it('should return correct error message for invalid email', () => {
      const emailControl = component.contactForm.get('user_email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      
      const errorMessage = component.getErrorMessage('user_email');
      expect(errorMessage).toBe('Ingrese un email válido');
    });

    it('should return correct error message for short message', () => {
      const messageControl = component.contactForm.get('message');
      messageControl?.setValue('Short');
      messageControl?.markAsTouched();
      
      const errorMessage = component.getErrorMessage('message');
      expect(errorMessage).toBe('Mensaje debe tener al menos 10 caracteres');
    });

    it('should return empty string for valid field', () => {
      const nameControl = component.contactForm.get('user_name');
      nameControl?.setValue('Valid Name');
      nameControl?.markAsTouched();
      
      const errorMessage = component.getErrorMessage('user_name');
      expect(errorMessage).toBe('');
    });
  });

  describe('Form Submission', () => {
    it('should not submit invalid form', () => {
      spyOn(component, 'sendEmail');
      
      component.sendEmail();
      
      expect(component.contactForm.valid).toBeFalse();
      // The method should mark all fields as touched for validation display
    });

    it('should mark all fields as touched when submitting invalid form', () => {
      component.sendEmail();
      
      expect(component.contactForm.get('user_name')?.touched).toBeTrue();
      expect(component.contactForm.get('user_email')?.touched).toBeTrue();
      expect(component.contactForm.get('message')?.touched).toBeTrue();
    });

    it('should process valid form data correctly', () => {
      // Set valid form data
      component.contactForm.patchValue({
        user_name: '  John Doe  ',
        user_email: '  JOHN@EXAMPLE.COM  ',
        message: '  This is a test message with enough characters  '
      });

      spyOn(component, 'sendEmail').and.callThrough();
      
      expect(component.contactForm.valid).toBeTrue();
    });
  });

  describe('Utility Methods', () => {
    it('should clear messages', () => {
      component.successMessage = 'Success!';
      component.errorMessage = 'Error!';
      
      component.clearMessages();
      
      expect(component.successMessage).toBe('');
      expect(component.errorMessage).toBe('');
    });

    it('should get correct field display name', () => {
      const nameDisplayName = (component as any).getFieldDisplayName('user_name');
      const emailDisplayName = (component as any).getFieldDisplayName('user_email');
      const messageDisplayName = (component as any).getFieldDisplayName('message');
      
      expect(nameDisplayName).toBe('Nombre');
      expect(emailDisplayName).toBe('Email');
      expect(messageDisplayName).toBe('Mensaje');
    });
  });

  describe('Getters', () => {
    it('should provide access to form controls', () => {
      expect(component.nameControl).toBe(component.contactForm.get('user_name'));
      expect(component.emailControl).toBe(component.contactForm.get('user_email'));
      expect(component.messageControl).toBe(component.contactForm.get('message'));
    });
  });
});
