import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      user_email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  // Custom validator for email format
  get nameControl() { return this.contactForm.get('user_name'); }
  get emailControl() { return this.contactForm.get('user_email'); }
  get messageControl() { return this.contactForm.get('message'); }

  // Get error messages for form validation
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(controlName)} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingrese un email válido';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(controlName)} debe tener al menos ${requiredLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        const requiredLength = control.errors['maxlength'].requiredLength;
        return `${this.getFieldDisplayName(controlName)} no puede exceder ${requiredLength} caracteres`;
      }
    }
    
    return '';
  }

  private getFieldDisplayName(controlName: string): string {
    const fieldNames: { [key: string]: string } = {
      'user_name': 'Nombre',
      'user_email': 'Email',
      'message': 'Mensaje'
    };
    return fieldNames[controlName] || controlName;
  }

  // Clear messages when user starts typing
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  sendEmail(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.clearMessages();

      // Parámetros para EmailJS
      const serviceID = 'service_56sss2x';
      const templateID = 'template_sus13ql';
      const publicKey = 'DmmAxeHKlkn15M5w5';

      // Data preprocessing and validation
      const formData = {
        user_name: this.contactForm.value.user_name.trim(),
        user_email: this.contactForm.value.user_email.trim().toLowerCase(),
        message: this.contactForm.value.message.trim(),
        timestamp: new Date().toISOString(),
        subject: `Nuevo mensaje de contacto de ${this.contactForm.value.user_name}`
      };

      emailjs.send(serviceID, templateID, formData, publicKey)
        .then((result: EmailJSResponseStatus) => {
          this.successMessage = "¡Mensaje enviado exitosamente! Te contactaremos pronto.";
          this.contactForm.reset();
          this.isSubmitting = false;
          
          // Auto-clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        })
        .catch((error) => {
          this.errorMessage = "Error al enviar el mensaje. Intenta nuevamente o contáctanos directamente.";
          this.isSubmitting = false;
          console.error('EmailJS Error:', error);
          
          // Auto-clear error message after 8 seconds
          setTimeout(() => {
            this.errorMessage = '';
          }, 8000);
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.contactForm.markAllAsTouched();
    }
  }
}
