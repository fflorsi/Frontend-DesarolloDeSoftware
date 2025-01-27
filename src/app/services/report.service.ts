import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
