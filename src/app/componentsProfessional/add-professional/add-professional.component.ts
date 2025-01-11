import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Professional } from '@app/interfaces/professional';
import { ProfessionalService } from '@app/services/professional.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.scss']
})
export class AddProfessionalComponent implements OnInit {

  formProfessional: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Añadir';
  tempPassword: string = ''

  constructor(
    private fb: FormBuilder,
    private _professionalService: ProfessionalService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.formProfessional = this.fb.group({
      dni: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', Validators.required],
    });

    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;  
  }

  ngOnInit(): void {
    console.log(this.id);
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getProfessional(this.id);
    }
  }

  getProfessional(id: number) {
    this.loading = true;
    this._professionalService.getProfessionalDetailById(id).subscribe({
      next: (response: any) => {
        const data = response.data;
        this.loading = false;
        this.formProfessional.setValue({
          dni: data.dni,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          phone: data.phone,
          email: data.email,
          birthDate: data.birthDate
        });
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Error al cargar los datos del profesional', 'Error');
      }
    });
  }

  addProfessional() {
    if (this.formProfessional.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Formulario inválido');
      return;
    }

    const professional: Professional = {
      dni: this.formProfessional.value.dni,
      firstname: this.formProfessional.value.firstname,
      lastname: this.formProfessional.value.lastname,
      address: this.formProfessional.value.address,
      phone: this.formProfessional.value.phone,
      email: this.formProfessional.value.email,
      birthDate: this.formProfessional.value.birthDate,
    };


    this.loading = true;
    this._professionalService.saveProfessional(professional).subscribe(
      response => {
        console.log(response.message);
        console.log(response.data);

        this.toastr.success(`El profesional ${professional.firstname} ${professional.lastname} fue registrado con éxito`, 'Profesional registrado');

        // Mostrar la contraseña temporal en la interfaz de usuario
        this.tempPassword = response.data.user.tempPassword;
        this.toastr.info(`La contraseña temporal es: ${this.tempPassword}`, 'Información',{
          timeOut: 5000
        });

        this.loading = false;
        this.router.navigate(['/viewAllProfessionals']);
      },
      error => {
        console.error('Error al crear el profesional:', error);
        this.loading = false;
        this.toastr.error('No se pudo crear el profesional', 'Error');
      }
    );
    }

  }
