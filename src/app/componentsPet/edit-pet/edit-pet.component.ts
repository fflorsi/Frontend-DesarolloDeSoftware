import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pet } from '@app/interfaces/pet';
import { PetService } from '@app/services/pet.service';
import { TypeService } from '@app/services/type.service';
import { Type } from '@app/interfaces/type';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss']
})
export class EditPetComponent implements OnInit {
  formPet: FormGroup;
  loading = true;
  operacion: string = 'Editar';
  id: number;
  availableTypes: Type[] = [];
  

  constructor(
    private fb: FormBuilder,
    private _petService: PetService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private typeService: TypeService

  ) {
    this.formPet = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', [Validators.required, this.noNumbersValidator]],
      weight: ['', Validators.required],
      client_id: [{ value: '', disabled: true }] // Deshabilitar el campo
    });
    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;  
  }

  ngOnInit(): void {
    this.getAvailableTypes();
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getPetDetail(this.id);
  }
}
  noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? { hasNumber: true } : null;
  }


  getPetDetail(id: number) {
    this.loading = true;
    this._petService.getPetDetailById(this.id).subscribe({
      next: (response: any) => {
          const data = response.data;
          this.loading = false;
          const birthdate = new Date(data.birthdate).toISOString().split('T')[0]; // Convertir la fecha al formato YYYY-MM-DD
          this.formPet.setValue({
            name: data.name,
            birthdate: birthdate,
            type: data.type,
            breed: data.breed,
            weight: data.weight,
            client_id: data.clientId,
          });
        },
        error: (err) => {
          this.toastr.error('Error al obtener el detalle de la mascota', 'Error');
        }
      });
    }

savePet() {
  if (this.formPet.invalid) {
    this.toastr.error('Por favor, complete todos los campos requeridos', 'Formulario inválido');
    return;
  }

  const pet: Pet = {
    name: this.formPet.value.name,
    birthdate: this.formPet.value.birthdate,
    type: this.formPet.value.type,
    breed: this.formPet.value.breed,
    weight: this.formPet.value.weight,
    client_id: this.formPet.value.clientId
  };
  this.loading = true;
  this._petService.savePet(pet).subscribe(() => {
      this.toastr.success(`La mascota ${pet.name} fue actualizada con éxito`, 'Mascota registrada');
      this.loading = false;
      this.router.navigate(['/ViewAllPets']);
    });
  }


  getAvailableTypes(): void {
    this.loading = true;
    this.typeService.getTypes().subscribe({
      next: (response: any) => {
        this.availableTypes = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener los tipos disponibles', 'Error');
        this.loading = false;
      }
    });
  }
}


  