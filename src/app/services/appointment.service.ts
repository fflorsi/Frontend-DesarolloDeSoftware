import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Appointment } from '../interfaces/appointment'; // Importamos la interfaz Appointment
import { PetService } from './pet.service';
import { FacilityService } from './facility.service';
import { HttpProviderService } from '@app/Service/http-provider.service';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private _petService: PetService,private _facilityService: FacilityService,private _professionalService: HttpProviderService) { 
    this.myAppUrl = environment.apiUrl;  
    this.myApiUrl = 'api/appointments';  
  }

  public getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  

  public getFutureAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.myAppUrl}${this.myApiUrl}/future`);
  }

  // Crear un nuevo turno
  public createAppointment(appointment: Appointment): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, appointment);
  }

  // Obtener un turno por ID
  public getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Actualizar el estado de un turno
  public updateAppointmentState(id: number, state: string): Observable<any> {
    const body = { state };
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, body);
  }

  // Eliminar un turno por ID
  public deleteAppointmentById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  // Método para obtener todos los turnos con sus detalles
  getAllAppointmentsWithDetails(): Observable<any[]> {
    return this.http.get<Appointment[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  // Método para obtener los turnos futuros con sus detalles
  getFutureAppointmentsWithDetails(): Observable<any[]> {
    return this.http.get<Appointment[]>(`${this.myAppUrl}${this.myApiUrl}/future`)
  }

  getFutureAppointmentsWithDetailsByClientId(clientId: number): Observable<any[]> {
    return this.http.get<Appointment[]>(`${this.myAppUrl}${this.myApiUrl}/future/${clientId}`);
}

getFutureAppointmentsWithDetailsByProfessionalId(professionalId: number): Observable<any[]> {
  return this.http.get<Appointment[]>(`${this.myAppUrl}${this.myApiUrl}/profapp/${professionalId}`);
}

}

