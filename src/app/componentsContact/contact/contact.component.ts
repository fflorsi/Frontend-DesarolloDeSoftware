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
        this.successMessage = "Message sent successfully!";
        this.errorMessage = '';
        console.log(result.text);
      })
      .catch((error) => {
        this.errorMessage = "Error sending message, please try again.";
        this.successMessage = '';
        console.error(error);
      });
  }
}
