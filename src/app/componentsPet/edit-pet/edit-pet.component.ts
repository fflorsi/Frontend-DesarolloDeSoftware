import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pet } from '@app/interfaces/pet';
import { PetService } from '@app/services/pet.service';

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

  constructor(
    private fb: FormBuilder,
    private _petService: PetService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.formPet = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      weight: ['', Validators.required],
      client_id: [{ value: '', disabled: true }] // Deshabilitar el campo
    });
    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;  
  }

  ngOnInit(): void {
    console.log(this.id);
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getPetDetail(this.id);
  }
}

  getPetDetail(id: number) {
    this.loading = true;
    this._petService.getPetDetailById(this.id).subscribe({
      next: (response: any) => {
          const data = response.data;
          console.log('Datos de la mascota:', data);
          this.loading = false;
          this.formPet.setValue({
            name: data.name,
            birthdate: data.birthdate,
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
}


  