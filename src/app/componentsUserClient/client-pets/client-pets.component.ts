import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from '@app/services/pet.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Pet } from '@app/interfaces/pet';
import { TypeService } from '@app/services/type.service';
import { Type } from '@app/interfaces/type';


@Component({
  selector: 'app-client-pets',
  templateUrl: './client-pets.component.html',
  styleUrls: ['./client-pets.component.scss']
})
export class ClientPetsComponent implements OnInit {
  petList: any[] = [];
  availableTypes: Type[] = [];
  clientId: number | undefined;
  formPet: FormGroup;
  loading = false;
  isEditMode = false;
  petToEdit: any;

  showForm = false;

  constructor(
    private petService: PetService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private typeService: TypeService

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

    this.getAvailableTypes();
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
        this.loading = false;
      }
    });
  }

  editPet(pet: any): void {
    this.isEditMode = true;
    this.petToEdit = pet;
    this.showForm = true;
    const birthdate = new Date(pet.birthdate).toISOString().split('T')[0];

    this.formPet.patchValue({
      name: pet.name,
      birthdate: birthdate,
      type: pet.type,
      breed: pet.breed,
      weight: pet.weight,
    });
  }

  savePet(): void {
    if (this.formPet.invalid) {
      this.toastr.error('Complete todos los campos requeridos', 'Formulario inválido');
      return;
    }else{
      this.showForm = false;
    }
  
    // Creamos el objeto petData a partir del formulario
    const petData = {
      ...this.formPet.value, 
      client_id: this.clientId // Aseguramos que el clientId se agregue correctamente
    };
    

    const pet: Pet = {
      name: this.formPet.value.name,
      birthdate: this.formPet.value.birthdate,
      type: Number(this.formPet.value.type),
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
      this.petService.savePet(pet).subscribe((response: any) => { // Asegúrate de que 'response' esté tipado
        this.toastr.success(`La mascota ${pet.name} fue registrada con éxito`, 'Mascota registrada');
        this.loading = false;
        const newPetId = response.data.id;
        this.createMedicalHistory(newPetId); 
      }, (error) => {
        this.toastr.error('Error al guardar la mascota', error);
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
    this.showForm = false;
  }



  createMedicalHistory(petId: number) {
    this.petService.createMedicalHistory({ petId }).subscribe(() => {
        this.toastr.success('Historia clínica creada con éxito', 'Éxito');
    }, error => {
        this.toastr.error('Error al crear la historia clínica', 'Error');
    });
}
}
