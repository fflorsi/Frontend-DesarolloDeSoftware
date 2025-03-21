import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  successMessage = '';
  errorMessage = '';

  sendEmail() {
    // Parámetros para EmailJS
    const serviceID = 'service_56sss2x';
    const templateID = 'template_sus13ql';
    const publicKey = 'DmmAxeHKlkn15M5w5';

    // Obtén los datos del formulario en un objeto
    const form = {
      user_name: (document.getElementById("name") as HTMLInputElement).value,
      user_email: (document.getElementById("email") as HTMLInputElement).value,
      message: (document.getElementById("message") as HTMLTextAreaElement).value,
    };

    emailjs.send(serviceID, templateID, form, publicKey)
      .then((result: EmailJSResponseStatus) => {
        this.successMessage = "El mensaje se ha enviado con éxito!";
        this.errorMessage = '';
      })
      .catch((error) => {
        this.errorMessage = "No pudimos enviar el mensaje, intenta de nuevo.";
        this.successMessage = '';
        console.error(error);
      });
  }
}
