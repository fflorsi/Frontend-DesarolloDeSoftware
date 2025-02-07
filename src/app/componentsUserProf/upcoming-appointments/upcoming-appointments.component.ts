import { Component } from '@angular/core';
import { AppointmentService } from '@app/services/appointment.service';
import { Appointment } from '@app/interfaces/appointment';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-upcoming-appointments',
  templateUrl: './upcoming-appointments.component.html',
  styleUrl: './upcoming-appointments.component.scss'
})
export class UpcomingAppointmentsComponent {
  appointments: Appointment[] = [];
  loading: boolean = true;
  professionalId!: number;

  constructor(
    private _appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfessionalIdFromToken();
    this.getFutureAppointments();
  }

  // Decodifica el token para obtener el ID del profesional
  getProfessionalIdFromToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken)
      this.professionalId = decodedToken.professionalId;
    } else {
      console.error('No se encontró el token');
    }
  }

  // Obtiene los turnos futuros para el profesional actual
  getFutureAppointments(): void {
    this._appointmentService.getFutureAppointmentsWithDetailsByProfessionalId(this.professionalId).subscribe(
      (data) => {
        this.appointments = data;
        console.log(this.appointments)
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching future appointments', error);
        this.loading = false;
      }
    );
  }

  cancelAppointment(id: number): void {
    const newState = 'cancelled';
    this._appointmentService.updateAppointmentState(id, newState).subscribe({
      next: () => {
        console.log(`Turno cancelado correctamente.`);
        this.getFutureAppointments();
      },
      error: (error) => {
        console.error(`Error al cancelar el turno con ID ${id}:`, error);
      }
    });
  }

  markAsDone(id: number): void {
    const newState = 'done';
    this._appointmentService.updateAppointmentState(id, newState).subscribe({
      next: () => {
        console.log(`Turno recibido correctamente.`);
        this.getFutureAppointments();
      },
      error: (error) => {
        console.error(`Error al marcar el turno con ID ${id} como recibido:`, error);
      }
    });
  }
}
