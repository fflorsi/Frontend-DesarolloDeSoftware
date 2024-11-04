import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-create-observation-dialog',
  templateUrl: './create-observation-dialog.component.html',
  styleUrls: ['./create-observation-dialog.component.scss']
})
export class CreateObservationDialogComponent {
  observationText: string = '';
  professionalId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CreateObservationDialogComponent>,
    private httpProvider: HttpProviderService,
    @Inject(MAT_DIALOG_DATA) public data: { medicalHistoryId: number }
  ) {}

  onSubmit(): void {
  const newObservation = {
    description: this.observationText, // Cambiado de 'observation' a 'description'
    professional: this.professionalId,
    medicalHistoryId: this.data.medicalHistoryId,
    name: 'Observación General'
  };

  this.httpProvider.createObservation(newObservation).subscribe({
    next: (response) => {
      console.log('Observación creada exitosamente:', response);
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