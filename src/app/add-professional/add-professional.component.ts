import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrl: './add-professional.component.scss'
})

export class AddProfessionalComponent implements OnInit {
  addProfessionalForm: professionalForm = new professionalForm();

  @ViewChild("professionalForm")
  professionalForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void { }

  AddProfessional(isValid:boolean) {
    this.isSubmitted = true; //verifica que el formulario ha sido enviado
    if (isValid) { //si isvalid es true llama al metodo addProfessional del servicio HTTP
      this.httpProvider.addProfessional(this.addProfessionalForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            this.router.navigate(['/viewAllProfessionals']);
            this.toastr.success('Profesional creado correctamente')
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message); 
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class professionalForm {
  dni: string = "";
  lastname: string = "";
  name: string = "";
  adress: string = "";
  phone_number: string = "";
  mail: string = "";
  birthdate: string = "";
}