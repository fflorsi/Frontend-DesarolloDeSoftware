import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Facility } from '@app/interfaces/facility';
import { Pet } from '@app/interfaces/pet';
import { Professional } from '@app/interfaces/professional';
import { HttpProviderService } from '@app/Service/http-provider.service';
import { AppointmentService } from '@app/services/appointment.service';
import { FacilityService } from '@app/services/facility.service';
import { PetService } from '@app/services/pet.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  petId!: number;  
  professionals: Professional[] = [];
  facilities: Facility[] = [];
  pet!: Pet;
  

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _appointmentService: AppointmentService,
    private _petService: PetService,
    private _facilityService: FacilityService,
    private _professionalService: HttpProviderService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.appointmentForm = this.fb.group({
      professionalId: [null, Validators.required],
      facilityId: [null, Validators.required],
      dateTime: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.petId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!this.petId) {
      console.error('No se proporcionó la ID de la mascota');
      return;
    }
    this.loadPet();
    this.loadProfessionals();
    this.loadFacilities();
  }

  loadProfessionals(): void {
    this._professionalService.getAllProfessional().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          const resultData = data.body.data;
          if (Array.isArray(resultData)) {
            this.professionals = resultData;
          } else {
            console.error('Se esperaba un array, pero se obtuvo:', resultData);
          }
        }
      },
    });
  }

  loadFacilities(): void {
    this._facilityService.getFacilities().subscribe((response: any) => {
      console.log('Respuesta del servidor:', response); 
      this.facilities = response.data;
    });
  }

  loadPet(){
    this._petService.getPetDetailById(this.petId).subscribe({next: (response: any) => {  
      this.pet = response.data;  
  },
  error: (error) => {
      console.error('Error fetching client data', error);
  }
})
  }

  requestAppointment(): void {
    if (this.appointmentForm.valid) {
      const appointmentData = {
        petId: this.petId,  
        ...this.appointmentForm.value
      };

      this._appointmentService.createAppointment(appointmentData).subscribe({
        next: (response) => {
          this.toastr.success('Turno solicitado correctamente', 'Éxito', {
            timeOut: 3000, 
          });
          this.router.navigate(['/Home'])
        },
        error: (error) => {
          console.error('Error al solicitar el turno:', error);
        }
      });
    }
  }
}
