import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface ReportData {
  totalClients: number;
  totalPets: number;
  monthlyData: { month: string, totalClients: number, totalPets: number }[];
}

export interface MostActiveProfessional {
  professionalId: number;
  professionalName: string;
  professionalDni: string;
  turnsAssigned: number;
}

export interface MostActiveProfessionalsResponse {
  mostActiveProfessionals: MostActiveProfessional[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private myAppUrl: string;
      private myApiUrl: string;
  
      constructor(private http: HttpClient){
          this.myAppUrl = 'http://localhost:3000/';
          this.myApiUrl = 'api/report';
  }

  getMonthlyIncome(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/monthly-earnings`);
  }

  getMostRequestedService(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/mostRequestedServices`);
  }

  getMostSoldProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/mostSoldProducts`);
  }

  getRegisteredClientsAndPets(): Observable<ReportData> {
    return this.http.get<ReportData>(`${this.myAppUrl}${this.myApiUrl}/registeredClientsAndPets`);
  }

  getMostActiveProfessionals(): Observable<MostActiveProfessionalsResponse> {
    return this.http.get<MostActiveProfessionalsResponse>(`${this.myAppUrl}${this.myApiUrl}/mostActiveProfessionals`);
  }
}
