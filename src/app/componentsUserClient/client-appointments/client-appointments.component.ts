import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '@app/services/appointment.service';
import { FacilityService } from '@app/services/facility.service';
import { PetService } from '@app/services/pet.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { ProfessionalService } from '@app/services/professional.service';
import { HttpProviderService } from '@app/Service/http-provider.service';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.scss']
})
export class ClientAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  clientId!: number | undefined;
  petList: any[] = [];  
  professionals: any[] = [];
  facilities: any[] = [];
  futureAppointments: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _appointmentService: AppointmentService,
    private _petService: PetService,
    private _facilityService: FacilityService,
    private _professionalService: HttpProviderService,
    private toastr: ToastrService
  ) {
    this.appointmentForm = this.fb.group({
      petId: [null, Validators.required],
      professionalId: [null, Validators.required],
      facilityId: [null, Validators.required],
      dateTime: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientId = this.getClientIdFromToken();  
    this.getPetList();
    this.loadProfessionals();
    this.loadFacilities();
    this.getFutureAppointments();
  }

  getClientIdFromToken(): number | undefined {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwtDecode<{ clientId?: number }>(token);
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
      this._petService.getPetsByClient(this.clientId).subscribe({
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

    loadProfessionals(): void {
      this._professionalService.getAllProfessional().subscribe({
        next: (data: any) => {
          if (data != null && data.body != null) {
            const resultData = data.body.data;
            if (Array.isArray(resultData)) {
              this.professionals = resultData;
            } else {
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

    getFutureAppointments(): void {
      if (!this.clientId) return;
      this._appointmentService.getFutureAppointmentsWithDetailsByClientId(this.clientId)
        .subscribe(
          (appointments) => {
            this.futureAppointments = appointments;
          },
          (error) => {
            console.error('Error al obtener los turnos futuros:', error);
          }
        );
    }

    requestAppointment(): void {
      if (this.appointmentForm.valid) {
        const appointmentData = {  
          ...this.appointmentForm.value
        };
    
        this._appointmentService.createAppointment(appointmentData).subscribe({
          next: (response) => {
            console.log('Turno solicitado correctamente:', response);
            this.toastr.success('Turno solicitado correctamente', 'Éxito', {
              timeOut: 3000, 
            });
    
            
            this.getFutureAppointments();
            this.appointmentForm.reset();  
          },
          error: (error) => {
            console.error('Error al solicitar el turno:', error);
          }
        });
      }
    }
    

  cancelAppointment(id: number): void {
    const newState = 'cancelled';  // Estado de "cancelado"
    this._appointmentService.updateAppointmentState(id, newState).subscribe({
      next: (response) => {
        console.log(`Turno cancelado correctamente.`);
        this.getFutureAppointments();
      },
      error: (error) => {
        console.error(`Error al cancelar el turno con ID ${id}:`, error);
      }
    });
  }
  
}
