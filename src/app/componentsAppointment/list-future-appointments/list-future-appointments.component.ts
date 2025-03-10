import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/services/appointment.service';
import { Appointment } from '@app/interfaces/appointment';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-list-future-appointments',
  templateUrl: './list-future-appointments.component.html',
  styleUrl: './list-future-appointments.component.scss'
})
export class ListFutureAppointmentsComponent implements OnInit {
  appointments: Appointment[] = []; 
  loading: boolean = true;
  petId!:number |undefined
  appointment!:Appointment

  constructor(private _appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {

    this.getFutureAppointments();
  }

  getFutureAppointments(): void {
    this._appointmentService.getFutureAppointments().subscribe(
        data => {
          this.appointments = data;
          this.loading = false;  
        },
        error => {
          console.error('Error fetching future appointments', error);
          this.loading = false;  
        }
      );
  }

  // Método para cancelar un turno
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
  
  // Método para marcar un turno como recibido
  markAsDone(id: number): void {
    /*/this._appointmentService.getAppointmentById(id).subscribe({
      next:(response:any) =>{
        this.appointment= response.data
      }
    })/*/
    const newState = 'done';  // Estado de "recibido"
    this._appointmentService.updateAppointmentState(id, newState).subscribe({
      next: (response) => {
        console.log(`Turno recibido correctamente.`);
        //this.petId= this.appointment.pet?.id
        //this.router.navigate(['/ViewPet/:petId'])
      },
      error: (error) => {
        console.error(`Error al marcar el turno con ID ${id} como recibido:`, error);
      }
    });
  }
}

