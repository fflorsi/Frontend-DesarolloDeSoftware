import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Pet} from '@app/interfaces/pet';
import { PetService } from '@app/services/pet.service';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrl: './add-edit-pet.component.scss'
})
export class AddEditPetComponent {
  formPet: FormGroup;
  loading: boolean = false;
  id: number;
  clientId: number; // Obtenemos el clientId de la URL
  operacion: string = 'Añadir';

  constructor(
    private fb: FormBuilder,
    private _petService: PetService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.formPet = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      type: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Para asegurar que es un número
      breed: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(0)]], // Peso mínimo 0
    });

    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;
    this.clientId = aRouter.snapshot.paramMap.get('idClient') ? Number(aRouter.snapshot.paramMap.get('idClient')) : 0;
    console.log('ID del cliente:', this.clientId);
  }

  ngOnInit(): void {
    console.log(this.id);
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getPet(this.id);
    }
  }

  getPet(id: number) {
    this.loading = true;
    this._petService.getPetDetaillById(id).subscribe({
      next: (response: any) => {
        const data = response.data;
        this.loading = false;
        this.formPet.setValue({
          name: data.name,
          birthdate: data.birthdate,
          type: data.type,
          breed: data.breed,
          weight: data.weight,
        });
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Error al cargar los datos de la mascota', 'Error');
      }
    });
  }

  addPet() {
    if (this.formPet.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Formulario inválido');
      return;
    }
    
    console.log('Datos enviados:', this.formPet.value);
    const pet: Pet = {
      name: this.formPet.value.name,
      birthdate: this.formPet.value.birthdate,
      type: this.formPet.value.type,
      breed: this.formPet.value.breed,
      weight: this.formPet.value.weight,
      client_id: this.clientId, 
    };
    console.log(pet);
    this.loading = true;
    if (this.id !== 0) {
      this._petService.updatePet(this.id, pet).subscribe(() => {
        this.toastr.info(`La mascota ${pet.name} fue actualizada con éxito`, 'Mascota actualizada');
        this.loading = false;
        this.router.navigate(['/listClients']);
      }, error => {
        this.loading = false;
        this.toastr.error('Error al actualizar la mascota', 'Error');
      });
    } else {
      this._petService.savePet(pet).subscribe(() => {
        this.toastr.success(`La mascota ${pet.name} fue registrada con éxito`, 'Mascota registrada');
        this.loading = false;
        this.router.navigate(['/listClients']);
      }, error => {
        this.loading = false;
        this.toastr.error('Error al registrar la mascota', 'Error');
      });
    }
  }
}

