import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Facility } from "../interfaces/facility";
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FacilityService{
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient){
        this.myAppUrl = environment.apiUrl;
        this.myApiUrl = 'api/facilities';
}

getFacilities(): Observable<Facility[]>{
    return this.http.get<Facility[]>(`${this.myAppUrl}${this.myApiUrl}`);
}

// obtener un servicio
public getFacilityById(id: number): Observable<Facility>{
    return this.http.get<Facility>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
}

//guardar un servicio
public saveFacility(facility: Facility): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, facility);
}

//eliminar un servicio
public deleteFacilityById(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
}

//editar un servicio
public updateFacility(id: number, facility: Facility): Observable<any>{
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, facility);}


searchFacilitiesByName(name: string): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.myAppUrl}api/facilities/search?name=${name}`);
}
}
