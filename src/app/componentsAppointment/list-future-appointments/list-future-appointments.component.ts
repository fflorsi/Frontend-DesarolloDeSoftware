import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/services/appointment.service';
import { Appointment } from '@app/interfaces/appointment';

@Component({
  selector: 'app-list-future-appointments',
  templateUrl: './list-future-appointments.component.html',
  styleUrl: './list-future-appointments.component.scss'
})
export class ListFutureAppointmentsComponent implements OnInit {
  appointments: any[] = []; // Aquí almacenaremos los turnos con detalles
  loading: boolean = true;  // Para mostrar un indicador de carga

  constructor(private _appointmentService: AppointmentService) {}

  ngOnInit(): void {
    console.log("p")
    this.getFutureAppointments();
  }

  getFutureAppointments(): void {
    this._appointmentService.getAllAppointmentsWithDetails().subscribe(
        data => {
          console.log(data)
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
    console.log(`Cancelando el turno con ID: ${id}`);
  }

  // Método para marcar un turno como recibido
  markAsReceived(id: number): void {
    console.log(`Marcando el turno con ID: ${id} como recibido`);
    // Aquí puedes implementar la lógica para marcar el turno como recibido
  }
}

