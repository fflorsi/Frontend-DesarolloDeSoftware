import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professional } from '@app/interfaces/professional';
import { ProfessionalService } from '@app/services/professional.service';

@Component({
  selector: 'app-edit-professional',
  templateUrl: './edit-professional.component.html',
  styleUrls: ['./edit-professional.component.scss']
})
export class EditProfessionalComponent implements OnInit {
  formProfessional: FormGroup;
  loading = true;
  operacion: string = 'Editar';
  id: number;

  constructor(
    private fb: FormBuilder,
    private _professionalService: ProfessionalService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.formProfessional = this.fb.group({
      dni: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required]
    });
    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;
  }

  ngOnInit(): void {
    console.log(this.id);
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getProfessionalDetail(this.id);
    }
  }

  getProfessionalDetail(id: number) {
    this.loading = true;
    this._professionalService.getProfessionalDetailById(this.id).subscribe({
      next: (response: any) => {
        const data = response.data;
        console.log('Datos del profesional:', data);
        this.loading = false;
        this.formProfessional.setValue({
          dni: data.dni,
          lastname: data.lastname,
          firstname: data.firstname,
          address: data.address,
          phone: data.phone,
          email: data.email,
          birthDate: data.birthDate,
        });
      },
      error: (err) => {
        this.toastr.error('Error al obtener el detalle del profesional', 'Error');
      }
    });
  }

  saveProfessional() {
    if (this.formProfessional.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Formulario inválido');
      return;
    }

    const professional: Professional = {
      dni: this.formProfessional.value.dni,
      lastname: this.formProfessional.value.lastname,
      firstname: this.formProfessional.value.firstname,
      address: this.formProfessional.value.address,
      email: this.formProfessional.value.email,
      birthDate: this.formProfessional.value.birthDate,
      phone: this.formProfessional.value.phone,
    };
    this.loading = true;
    this._professionalService.updateProfessional(this.id, professional).subscribe(() => {
      this.toastr.success(`El profesional ${professional.firstname} fue actualizado con éxito`, 'Profesional registrado');
      this.loading = false;
      this.router.navigate(['/viewAllProfessionals']);
    });
  }
}