import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateObservationDialogComponent } from '../create-observation-dialog/create-observation-dialog.component';
import { ShowObservationDialogComponent } from '../show-observation-dialog/show-observation-dialog.component';
import { EditObservationDialogComponent } from '@app/edit-observation-dialog-component/edit-observation-dialog-component.component';
import { DeleteObservationDialogComponent } from '@app/delete-observation-dialog/delete-observation-dialog.component';

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
  isDialogOpen: any;
  
  constructor(public httpProvider: HttpProviderService, private route: ActivatedRoute, public dialog: MatDialog) { }

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

openCreateObservationDialog(): void {
  const dialogRef = this.dialog.open(CreateObservationDialogComponent, {
    width: '400px',
    height: 'auto',
    disableClose: true,
    panelClass: ['custom-dialog', 'centered-dialog'], // Añade estas clases
    backdropClass: 'custom-backdrop',
    // Elimina la propiedad position ya que queremos que esté centrado
    data: {
      medicalHistoryId: this.medicalHistory.id
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const medicalHistoryId = this.medicalHistory.id;
      this.getObservations(medicalHistoryId);
    }
  });
}

openShowObservationDialog(observation: any): void {
  this.isDialogOpen = true;
  const dialogRef = this.dialog.open(ShowObservationDialogComponent, {
    width: '500px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    data: { observation },
    disableClose: true,
    autoFocus: true,
    panelClass: ['custom-dialog', 'centered-dialog'],
    backdropClass: 'custom-backdrop',
    position: {
      top: '0%',
      left: '0%'
    }
  });

  dialogRef.afterClosed().subscribe(() => {
    this.isDialogOpen = false;
  });
}

openEditObservationDialog(observation: any): void {
    const dialogRef = this.dialog.open(EditObservationDialogComponent, {
        width: '400px',
        data: { observation },
        disableClose: true,
        autoFocus: true,
        panelClass: ['custom-dialog', 'centered-dialog'],
        backdropClass: 'custom-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.httpProvider.updateObservation(result).subscribe({
                next: (response: any) => {
                    console.log('Observation updated successfully:', response);
                    const medicalHistoryId = this.medicalHistory.id;
                    this.getObservations(medicalHistoryId);
                },
                error: (error) => {
                    console.error('Error updating observation:', error);
                }
            });
        }
    });
}

updateObservation(updatedObservation:any) {
  // Implementa este método en tu servicio HTTP para actualizar la observación en el backend
  return this.httpProvider.updateObservation(updatedObservation);
}


openDeleteObservationDialog(observation: any): void {
  const dialogRef = this.dialog.open(DeleteObservationDialogComponent, {
    width: '350px',
    data: { observation },
    panelClass: ['custom-dialog', 'centered-dialog'],
    backdropClass: 'custom-backdrop'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.httpProvider.deleteObservation(observation.id).subscribe({
        next: () => {
          console.log('Observation deleted successfully');
          // Actualizar la lista de observaciones
          const medicalHistoryId = this.medicalHistory.id;
          this.getObservations(medicalHistoryId);
        },
        error: (error) => {
          console.error('Error deleting observation:', error);
          // Aquí podrías agregar un mensaje de error para el usuario
        }
      });
    }
  });
}
}


