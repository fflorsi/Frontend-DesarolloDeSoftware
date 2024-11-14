import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Appointment } from '../interfaces/appointment'; // Importamos la interfaz Appointment
import { PetService } from './pet.service';
import { FacilityService } from './facility.service';
import { HttpProviderService } from '@app/Service/http-provider.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private _petService: PetService,private _facilityService: FacilityService,private _professionalService: HttpProviderService) { 
    this.myAppUrl = 'http://localhost:3000/';  
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
  /*/getFutureAppointmentsWithDetails(): Observable<any[]> {
    return this.http.get<Appointment[]>(`${this.myAppUrl}${this.myApiUrl}/future`)
    .pipe(
      switchMap(appointments => {
        const petRequests = appointments.map(appointment =>
          this._petService.getPetDetaillById(appointment.petId).pipe(
            map(pet => ({ ...appointment, pet }))
          )
        );

        const professionalRequests = appointments.map(appointment =>
          this._professionalService.getProfessionalDetailById(appointment.professionalId).pipe(
            map(professional => ({ ...appointment, professional }))
          )
        );

        const facilityRequests = appointments.map(appointment =>
          this._facilityService.getFacilityById(appointment.facilityId).pipe(
            map(facility => ({ ...appointment, facility }))
          )
        );

        return forkJoin([...petRequests, ...professionalRequests, ...facilityRequests]).pipe(
          map(results => results)
        );
      })
    );
  }/*/
}

