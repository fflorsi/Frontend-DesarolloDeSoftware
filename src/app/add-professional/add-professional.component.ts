import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.scss'] // Corregí el nombre del archivo de estilo a "styleUrls"
})
export class AddProfessionalComponent implements OnInit {
  // Iniciamos el formulario con los valores por defecto
  addProfessionalForm: professionalForm = new professionalForm();

  // Declaramos una referencia al formulario con el ViewChild
  @ViewChild('professionalForm') professionalForm!: NgForm;

  // Bandera para saber si el formulario ha sido enviado
  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void { }

  // Método que se llama al enviar el formulario
  AddProfessional(isValid: boolean) {
    this.isSubmitted = true; // Marcamos que el formulario ha sido enviado
    
    if (isValid) { // Si el formulario es válido, realizamos la solicitud HTTP
      this.httpProvider.addProfessional(this.addProfessionalForm).subscribe(
        async data => {
          if (data != null && data.body != null) {
            const resultData = data.body;
            this.router.navigate(['/viewAllProfessionals']);
            this.toastr.success('Profesional creado correctamente');
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
            }
          }
        },
        async error => {
          // Si ocurre un error, mostramos el mensaje y redirigimos
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }
}

// Definimos la estructura del formulario
export class professionalForm {
  dni: string = '';
  lastname: string = '';
  firstname: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';
  birthDate: string = '';
}
