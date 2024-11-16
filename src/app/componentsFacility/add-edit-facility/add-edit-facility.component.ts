import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facility } from 'app/interfaces/facility';
import { FacilityService } from 'app/services/facility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-facility',
  templateUrl: './add-edit-facility.component.html',
  styleUrl: './add-edit-facility.component.scss'
})

export class AddEditFacilityComponent implements OnInit {

  formFacility: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Añadir';

  constructor(
    private fb: FormBuilder,
    private _facilityService: FacilityService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.formFacility = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
      });

    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;  
  }

  ngOnInit(): void {
    console.log(this.id);
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getFacility(this.id);
    }
  }

  getFacility(id: number) {
    this.loading = true;
    this._facilityService.getFacilityById(id).subscribe({
      next: (response: any) => {
        const data = response.data;
        this.loading = false;
        this.formFacility.setValue({
          name: data.name,
          description: data.description,
          price: data.price,
        });
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Error al obtener los datos');
      }
    });
  }

  addFacility() {
    if (this.formFacility.invalid) {
      this.toastr.error('Complete los campos requeridos');
      return;
    }
  
    const facility: Facility = {
      name: this.formFacility.value.name,
      description: this.formFacility.value.description,
      price: this.formFacility.value.price
    }
  
    this.loading = true;
    if(this.id !== 0){
      this._facilityService.updateFacility(this.id, facility).subscribe({
        next: () => {
          this.toastr.info(`El servicio ${facility.name} ha sido actualizado`, 'Servicio Actualizado');
          this.loading = false;
          this.router.navigate(['/listFacilities']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el servicio');
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this._facilityService.saveFacility(facility).subscribe({
        next: () => {
          this.toastr.success(`El servicio ${facility.name} ha sido añadido`, 'Servicio Añadido');
          this.loading = false;
          this.router.navigate(['/listFacilities']);
        },
        error: (err) => {
          this.toastr.error('Error al añadir el servicio');
          this.loading = false;
          console.error('error details:', err); // si pasa de los 255 caracteres, se corta
        }
      });
    }
  }
}