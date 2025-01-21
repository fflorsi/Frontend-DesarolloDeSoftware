import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from '@app/services/pet.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Pet } from '@app/interfaces/pet';

@Component({
  selector: 'app-client-pets',
  templateUrl: './client-pets.component.html',
  styleUrls: ['./client-pets.component.scss']
})
export class ClientPetsComponent implements OnInit {
  petList: any[] = [];
  clientId: number | undefined;
  formPet: FormGroup;
  loading = false;
  isEditMode = false;
  petToEdit: any;

  constructor(
    private petService: PetService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formPet = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      
    });
  }

  ngOnInit(): void {
    this.clientId = this.getClientIdFromToken();
    
    if (this.clientId) {
      this.getPetList();
    }
  }

  getClientIdFromToken(): number | undefined {
    const token = localStorage.getItem('authToken');
    console.log(token)
    if (token) {
      try {
        const decodedToken = jwtDecode<{ clientId?: number }>(token);
        console.log('Decoded Token:', decodedToken);  // Ver contenido del token
        return decodedToken.clientId;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('Token no encontrado en localStorage.');
    }
    return undefined;
  }
  

  getPetList(): void {
    if (!this.clientId) return;
    this.loading = true;
    this.petService.getPetsByClient(this.clientId).subscribe({
      next: (response: any) => {
        this.petList = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener la lista de mascotas', 'Error');
        this.loading = false;
      }
    });
  }

  editPet(pet: any): void {
    this.isEditMode = true;
    this.petToEdit = pet;
    this.formPet.patchValue({
      name: pet.name,
      birthdate: pet.birthdate,
      type: pet.type,
      breed: pet.breed,
      weight: pet.weight,
    });
  }

  savePet(): void {
    if (this.formPet.invalid) {
      this.toastr.error('Complete todos los campos requeridos', 'Formulario inválido');
      return;
    }
  
    // Creamos el objeto petData a partir del formulario
    const petData = {
      ...this.formPet.value, 
      client_id: this.clientId // Aseguramos que el clientId se agregue correctamente
    };
    

    const pet: Pet = {
      name: this.formPet.value.name,
      birthdate: this.formPet.value.birthdate,
      type: this.formPet.value.type,
      breed: this.formPet.value.breed,
      weight: this.formPet.value.weight,
      client_id: Number(this.clientId),  // Asegurándonos que clientId es un número
    };


    console.log('Datos de la mascota:', petData); // Verifica que el objeto esté correcto
  
    this.loading = true;
  
    if (this.isEditMode) {
      // Si estamos en modo de edición, actualizamos la mascota
      this.petService.updatePet(this.petToEdit.id, petData).subscribe(() => {
        this.toastr.success('Mascota actualizada con éxito', 'Éxito');
        this.getPetList();
        this.formPet.reset();
        this.isEditMode = false;
        this.petToEdit = null;
        this.loading = false;
      }, (error) => {
        this.toastr.error('Error al actualizar la mascota', 'Error');
        this.loading = false;
      });
    } else {
      // Si estamos creando una nueva mascota
      this.petService.savePet(pet).subscribe(() => {
        this.toastr.success('Mascota registrada con éxito', 'Éxito');
        this.getPetList();
        this.formPet.reset();
        this.loading = false;
      }, (error) => {
        this.toastr.error('Error al guardar la mascota', 'Error');
        this.loading = false;
      });
    }
  }
  
  

  deletePet(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta mascota?')) {
      this.loading = true;
      this.petService.deletePetById(id).subscribe(() => {
        this.toastr.warning('La mascota fue eliminada con éxito', 'Eliminación exitosa');
        this.getPetList();
        this.loading = false;
      }, (error) => {
        this.toastr.error('Error al eliminar la mascota', 'Error');
        this.loading = false;
      });
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.petToEdit = null;
    this.formPet.reset();
  }
}
