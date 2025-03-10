import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Pet} from '@app/interfaces/pet';
import { PetService } from '@app/services/pet.service';
import { TypeService } from '@app/services/type.service';
import { Type } from '@app/interfaces/type';

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
  availableTypes: Type[] = [];

  constructor(
    private fb: FormBuilder,
    private _petService: PetService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private typeService: TypeService
  ) {
    this.formPet = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      type: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Para asegurar que es un número
      breed: ['', [Validators.required, this.noNumbersValidator]],
      weight: [null, [Validators.required, Validators.min(0)]], // Peso mínimo 0
    });

    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;
    this.clientId = aRouter.snapshot.paramMap.get('idClient') ? Number(aRouter.snapshot.paramMap.get('idClient')) : 0;
    console.log('ID del cliente:', this.clientId);
  }

  ngOnInit(): void {
    this.getAvailableTypes();
    console.log(this.id);
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getPet(this.id);
    }
  }

  noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? { hasNumber: true } : null;
  }

  getPet(id: number) {
    this.loading = true;
    this._petService.getPetDetailById(id).subscribe({
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
        // Actualizar mascota existente
        this._petService.updatePet(this.id, pet).subscribe(() => {
            this.toastr.info(`La mascota ${pet.name} fue actualizada con éxito`, 'Mascota actualizada');
            this.loading = false;
            this.router.navigate(['/listPets', this.clientId]);
        }, error => {
            this.loading = false;
            this.toastr.error('Error al actualizar la mascota', 'Error');
        });
    } else {
        // Crear nueva mascota
        this._petService.savePet(pet).subscribe((response: any) => { // Asegúrate de que 'response' esté tipado
            this.toastr.success(`La mascota ${pet.name} fue registrada con éxito`, 'Mascota registrada');
            this.loading = false;
            const newPetId = response.data.id; // Obtener el ID de la nueva mascota
            this.createMedicalHistory(newPetId); // Llamar a createMedicalHistory con el ID
            this.router.navigate(['/listPets', this.clientId]);
        }, error => {
            this.loading = false;
            this.toastr.error('Error al registrar la mascota', 'Error');
        });
    }
}

  createMedicalHistory(petId: number) {
    this._petService.createMedicalHistory({ petId }).subscribe(() => {
        this.toastr.success('Historia clínica creada con éxito', 'Éxito');
    }, error => {
        this.toastr.error('Error al crear la historia clínica', 'Error');
    });
}
getAvailableTypes(): void {
  this.loading = true;
  this.typeService.getTypes().subscribe({
    next: (response: any) => {
      console.log('Tipos disponibles:', response.data);
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

