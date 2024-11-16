import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '@app/services/appointment.service';
import { Appointment } from '@app/interfaces/appointment';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss'] 
})
export class ListAppointmentsComponent implements OnInit {
  appointments: Appointment[] = []; 
  paginatedAppointments: Appointment[] = [];
  loading: boolean = true;  
  pageEvent?: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        this.setPaginatedAppointments();  
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

  setPaginatedAppointments() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedAppointments = this.appointments.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedAppointments();
  }
}
