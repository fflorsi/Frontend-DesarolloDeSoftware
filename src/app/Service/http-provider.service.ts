import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

var apiUrl = 'http://localhost:3000/';

var httpLink = {
  getAllPet: apiUrl + 'api/pets',
  deletePetById: apiUrl + 'api/pets',
  getPetDetailById: apiUrl + 'api/pets',
  savePet: apiUrl + 'api/pets',
  getClientByDni: apiUrl + 'api/clients/by-dni',
  getMedicalHistories: apiUrl + 'api/medicalHistory'
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {

  constructor(private http: HttpClient) { }

  public getAllPet(): Observable<any>{
     const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  return this.http.get<any[]>(httpLink.getAllPet, { headers, observe: 'response' });
}

  public deletePetById(model: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.delete(`${httpLink.deletePetById}/${model.id}`, { headers, observe: 'response' })
  }


  public getPetDetailById(model: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(`Fetching details for pet ID: ${model}`);
    return this.http.get<any>(`${httpLink.getPetDetailById}/${model}`, { headers });
  }

  public savePet(model:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${httpLink.savePet}/${model.id}`, model, { headers, observe: 'response' });
  }

  public getClientByDni(dni: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${httpLink.getClientByDni}/${dni}`, { headers, observe: 'response' });
  }

  public getMedicalHistories(model: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  console.log(`Fetching details for pet ID: ${model}`);
  return this.http.get<any>(`${httpLink.getMedicalHistories}/${model}`, { headers });
  }
}

