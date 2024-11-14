import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { WebApiService } from './web-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '@app/interfaces/pet.js';

var apiUrl = 'http://localhost:3000/';

var httpLink = {
  getAllPet: apiUrl + 'api/pets',
  deletePetById: apiUrl + 'api/pets',
  getPetDetailById: apiUrl + 'api/pets',
  savePet: apiUrl + 'api/pets',
  getClientByDni: apiUrl + 'api/clients/by-dni',
  getMedicalHistories: apiUrl + 'api/medicalHistory',
  getObservations: apiUrl + 'api/observation/byMedicalHistory',
  saveObservation: apiUrl + 'api/observation',
  updateObservation: apiUrl + 'api/observation',
  deleteObservation: apiUrl + 'api/observation',
  getVaccines: apiUrl + 'api/vaccines',
  addVaccine: apiUrl + 'api/vaccines',
  updateVaccine: apiUrl + 'api/vaccines',
  deleteVaccine: apiUrl + 'api/vaccines',
  getAllProfessional: apiUrl + 'api/professionals',
  saveProfessional: apiUrl + 'api/professionals',
  deleteProfessionalById: apiUrl + 'api/professionals',
  getProfessionalDetailById: apiUrl + 'api/professionals'
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


  public getPetDetailById(id: number): Observable<Pet> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(`Fetching details for pet ID: ${id}`);
    return this.http.get<Pet>(`${httpLink.getPetDetailById}/${id}`, { headers });
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

  public getObservations(medicalHistoryId: number): Observable<any> {
  const headers = new HttpHeaders({
  'Content-Type': 'application/json'
  });
  return this.http.get<any>(`${httpLink.getObservations}/${medicalHistoryId}`, { headers });
  }

  public createObservation(observationData: any) {
  return this.http.post(httpLink.saveObservation, observationData);
  }

  public updateObservation(observation: any): Observable<any> {
  return this.http.put(`${httpLink.updateObservation}/${observation.id}`, observation)
  }

  public deleteObservation(observationId: number) {
  return this.http.delete(`${httpLink.deleteObservation}/${observationId}`);
  }

  public getVaccines(): Observable<any> {
  return this.http.get<any>(`${httpLink.getVaccines}`)
  }

  public getVaccine(id: number): Observable<any> {
  return this.http.get(`${httpLink.getVaccines}/${id}`)
  }

  public addVaccine(vaccine: any): Observable<any> {
  return this.http.post(`${httpLink.addVaccine}`,vaccine)
  }

  public updateVaccine(id: number, vaccine: any): Observable<any> {
  return this.http.put(`${httpLink.updateVaccine}/${id}`,vaccine)
  }

  public deleteVaccine(id: number){
  return this.http.delete(`${httpLink.deleteVaccine}/${id}`)
  }

  public linkVaccineToMedicalHistory(medicalHistoryId: number, vaccineId: number) {
  return this.http.post(`${httpLink.getMedicalHistories}/${medicalHistoryId}/vaccines`, { vaccineId });
}

  public getAllProfessional(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(httpLink.getAllProfessional, { headers, observe: 'response' }).pipe(
      tap((response: any) => {
        console.log('Respuesta del backend para getAllProfessional:', response);
      })
    );
  }


  public deleteProfessionalById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${httpLink.deleteProfessionalById}/${id}`, { headers, observe: 'response' }).pipe(
      tap(response => {
        console.log('Profesional eliminado:', response);
      }),
    );
  }

  public saveProfessional(model: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  if (model.id) {
    return this.http.put(`${httpLink.saveProfessional}/${model.id}`, model, { headers, observe: 'response' });
  } else {
    return this.http.post(httpLink.saveProfessional, model, { headers, observe: 'response' });
  }
  }


  public addProfessional(professionalData: any): Observable<any> {
  console.log(professionalData);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.post(httpLink.saveProfessional, professionalData, { headers, observe: 'response' });
  }



  public getProfessionalDetailById(id: number): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  console.log(`Fetching details for professional ID: ${id}`);
  return this.http.get<any>(`${httpLink.getProfessionalDetailById}/${id}`, { headers }).pipe(
    tap((response) => console.log('Respuesta de la API:', response)));
  }

  unlinkVaccine(medicalHistoryId: number, vaccineId: number): Observable<any> {
  return this.http.delete(`${httpLink.getMedicalHistories}/${medicalHistoryId}/vaccines/?vaccineId=${vaccineId}`);
}
}

