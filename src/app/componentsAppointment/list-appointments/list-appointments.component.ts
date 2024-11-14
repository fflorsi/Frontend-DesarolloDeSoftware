import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@app/services/appointment.service';
import { Appointment } from '@app/interfaces/appointment';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss'] 
})
export class ListAppointmentsComponent implements OnInit {
  appointments: Appointment[] = []; 
  loading: boolean = true;  

  constructor(private _appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this._appointmentService.getAllAppointmentsWithDetails().subscribe(
      data => {
        console.log(data);
        this.appointments = data;
        this.sortAppointmentsByDateTime(); 
        this.loading = false;  
      },
      error => {
        console.error('Error fetching future appointments', error);
        this.loading = false;  
      }
    );
  }

  sortAppointmentsByDateTime(): void {
    this.appointments.sort((a, b) => {
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });
  }
}
