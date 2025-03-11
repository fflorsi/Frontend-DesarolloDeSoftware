import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpProviderService } from '../../Service/http-provider.service';

interface ObservationData {
  professionalData: {
    lastname: string;
    firstname: string;
  };
}

interface DialogData {
  medicalHistoryId: number;
  observation?: ObservationData;
}

@Component({
  selector: 'app-create-observation-dialog',
  templateUrl: './create-observation-dialog.component.html',
  styleUrls: ['./create-observation-dialog.component.scss']
})
export class CreateObservationDialogComponent {
  observationText: string = '';
  selectedProfessionalId: number = 0;
  selectedProfessionalName: string = '';
  professionals: any[] = []; // Lista de profesionales
  panelOpenState: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateObservationDialogComponent>,
    private httpProvider: HttpProviderService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.loadProfessionals(); // Cargar la lista de profesionales al iniciar el componente
  }

  loadProfessionals(): void {
    this.httpProvider.getProfessionals().subscribe({
      next: (response: any) => {
        this.professionals = response.data || [];
      },
      error: (error: any) => {
        console.error('Error fetching professionals', error);
      }
    });
  }

  selectProfessional(professional: any): void {
    this.selectedProfessionalId = professional.id; // Asignar el ID del profesional seleccionado
    this.selectedProfessionalName = `${professional.lastname}, ${professional.firstname}`;
    this.panelOpenState = false; // Cerrar el panel después de seleccionar
  }

  onSubmit(): void {
    const newObservation = {
      description: this.observationText,
      professional: this.selectedProfessionalId,
      medicalHistoryId: this.data.medicalHistoryId,
      name: 'Observación General'
    };

    this.httpProvider.createObservation(newObservation).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error al crear la observación:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}