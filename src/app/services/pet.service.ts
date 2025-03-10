import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pet} from '../interfaces/pet';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PetService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = 'api/pets';
  }

  public getPets(): Observable<Pet[]>{
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  public getPetsByClient(id:number,): Observable<Pet[]>{
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}/by-client/${id}`)
  }

  public getPetDetailById(id:number):Observable<Pet>{
    return this.http.get<Pet>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  public updatePet(id: number, pet: Pet): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, pet);
  }

  public savePet(pet: Pet): Observable<Pet> { 
    return this.http.post<Pet>(`${this.myAppUrl}${this.myApiUrl}`, pet);
}

  public deletePetById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  public createMedicalHistory(medicalHistoryData: { petId: number }): Observable<any> {
    return this.http.post(`${this.myAppUrl}api/medicalHistory`, medicalHistoryData);
  }
}
