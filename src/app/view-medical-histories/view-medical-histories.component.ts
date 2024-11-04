import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'medicalHistory',
  templateUrl: './view-medical-histories.component.html',
  styleUrls: ['./view-medical-histories.component.scss']
})
export class ViewMedicalHistoriesComponent implements OnInit {
  petId: any;
  medicalHistory: any | null = null; // Cambia 'any' a un tipo más específico si es posible
  paginatedObservations: any[] = []; // Array paginado de observaciones

  // Variables de paginación
  pageSize = 3; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  totalObservations = 0; // Total de observaciones

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Para acceder al paginator
  
  constructor(public httpProvider: HttpProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params['petId'];
    this.getMedicalHistories();
  }

  getMedicalHistories(): void {
    this.httpProvider.getMedicalHistories(this.petId).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.medicalHistory = response.data;

          // Verificar si existen las propiedades antes de asignar a la vista
          this.medicalHistory.vaccines = response.data.vaccines || [];
          
          // Llamar a la API de observaciones usando el ID de la historia clínica
          const medicalHistoryId = this.medicalHistory.id; // Asegúrate de que el ID está disponible
          if (medicalHistoryId) {
            this.getObservations(medicalHistoryId);
          } else {
            console.error('Clinical history ID is missing');
            this.medicalHistory.observations = [];
          }

          console.log('Medical history details:', this.medicalHistory);
        } else {
          console.error('No data found in response:', response);
          this.medicalHistory = null; // Asegúrate de establecerlo como null si no hay datos
        }
      },
      error: (error: any) => {
        console.error('Error fetching medical history details', error);
        this.medicalHistory = null; // Establece como null si hay un error
      },
      complete: () => {
        console.log('Fetch medical history details complete');
      }
    });
  }

  getObservations(medicalHistoryId: number): void {
    this.httpProvider.getObservations(medicalHistoryId).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.medicalHistory.observations = response.data;
          console.log(typeof(this.medicalHistory.observations))
          console.log(this.medicalHistory.observations.length)
          console.log(this.medicalHistory.observations)
          this.totalObservations = this.medicalHistory.observations.length;
          this.updatePaginatedObservations();
        } else {
          console.error('No observations found in response:', response);
          this.medicalHistory.observations = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching observations', error);
        this.medicalHistory.observations = []; // Establece como vacío si hay un error
      },
      complete: () => {
        console.log('Fetch observations complete');
        console.log(this.medicalHistory.observations)
      }
    });
  }

  updatePaginatedObservations(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedObservations = this.medicalHistory?.observations.slice(startIndex, endIndex) || [];
  }

  // Método que se ejecuta cuando se cambia la página
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize; // Aunque puedes mantenerlo fijo, aquí puedes hacer que sea variable si lo decides
    this.updatePaginatedObservations(); // Actualizar los datos de la tabla
  }
}
