import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Professional } from "../interfaces/professional";

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/professionals';
   }

   getProfessionals(): Observable<Professional[]> {
     return this.http.get<Professional[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   public deleteProfessionalById(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
   }

   public saveProfessional(professional: Professional): Observable<{ message: string, data: any }> {
    return this.http.post<{ message: string, data: any }>(`${this.myAppUrl}${this.myApiUrl}`, professional);
}


    public getProfessionalDetailById(id: number): Observable<Professional> {
      return this.http.get<Professional>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }

    public updateProfessional(id: number, professional: Professional): Observable<any> {
      return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, professional);
    }

}
